---
title: "spiped-ssh-secure-proxy"
date: "2009-09-25T12:02:03.284Z"
tags: [education, advertising, finance]
---

<p>Recently, I&#x2019;ve been getting more concerned in security. As an American living in a Middle Eastern <em>monarchy</em>, multiple government agencies are likely monitoring my internet traffic&#x2014;not to mention that I frequently connect to servers from sketchy internet cafes while traveling in the developing world. To mitigate these risks, I proxy all my traffic through a secure server&#x2014;but with the recent <a href="http://www.vox.com/2014/4/8/5593654/heartbleed-explainer-big-new-web-security-flaw-compromise-privacy">heartbleed bug</a>, I decided to step my security up a&#xA0;notch.</p>

<p>Now, all traffic is routed through <a href="http://www.tarsnap.com/spiped.html">spiped</a>, a simple and secure utility. Using Docker, I&#x2019;ve automated most of the setup for this system, so you can easily route your traffic securely as&#xA0;well.</p>

<h3>Server&#xA0;Setup</h3>

<p>Setting up the server for this is quite simple, assuming you have <a href="http://docker.io">Docker</a>&#xA0;installed.</p>

<ol>
  <li>
    <p>Clone my Dockerfile, which handles setting up a Socks proxy (with <span class="caps">SSH</span>) and the spiped&#xA0;server.</p>

    <p><code>git clone https://github.com/morgante/spiped-docker&#xA0;/home/spiped</code></p>
  </li>
  <li>
    <p>Enter the spiped directory, where the magic&#xA0;happens:</p>

    <p><code>cd&#xA0;/home/spiped</code></p>
  </li>
  <li>
    <p>Generate a secure key for the spiped socket to use for communication across the&#xA0;internet.</p>

    <p><code>dd if=/dev/urandom bs=32 count=1&#xA0;of=spiped.key</code></p>
  </li>
  <li>
    <p>Build the Docker image (it will automatically load the key you just&#xA0;generated)</p>

    <p><code>docker build -t spiped&#xA0;.</code></p>
  </li>
  <li>
    <p>Start the spiped server with&#xA0;Docker:</p>

    <p><code>docker run -d -p 49168:8089 -t&#xA0;spiped</code></p>
  </li>
</ol>
<p>You now have a fully functional <span class="caps">SOCKS</span> proxy listening on port 49168 and secured using a private&#xA0;key.</p>

<h3>Client&#xA0;Setup</h3>

<p>On the client, all you need to do is installed spiped and connect to the server. These instructions are for <span class="caps">OS</span> X, but the process should be similar for other operating&#xA0;systems.</p>

<ol>
  <li>
    <p>Install spiped (with&#xA0;<a href="http://brew.sh">Homebrew</a>).</p>
    <p><code>brew install&#xA0;spiped</code></p>
  </li>
  <li>
    <p>Copy the private key from your&#xA0;server.</p>
    <p><code>scp username@server.name:/home/spiped/spiped.key&#xA0;~/spiped.key</code></p>
  </li>
  <li>
    <p>Start the spiped&#xA0;client:</p>

    <p><code>spiped -e -s &apos;[0.0.0.0]:8089&apos; -t &apos;[107.170.94.89]:49168&apos; -k&#xA0;~/spiped.key</code></p>
  </li>
  <li>In System Preferences, configure your network to connect to a <span class="caps">SOCKS</span> proxy at&#xA0;<strong>localhost:8089</strong>.</li>
</ol>
<p>Now all your internet activity is securely routed through your server. If you want to automate this slightly more, I have written a very simple <a href="https://github.com/morgante/dotfiles/blob/master/home/.tunnel-start">start&#xA0;script</a>.</p>

<p>In my experience, the spiped tunnel is highly reliable and recovers more gracefully than a standard <span class="caps">SSH</span>&#xA0;tunnel.</p>

<p>Leave any questions in the comments and I&#x2019;ll do my best to&#xA0;answer.</p>
