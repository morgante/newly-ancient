import glob
import re
from bs4 import BeautifulSoup

PATTERNS = {
  "BLOG": re.compile(r'\/(\d\d\d\d)\/(\d\d)/(\d\d)/index.html')
}

def import_blog(filename):
  with open(filename) as fp:
    soup = BeautifulSoup(fp.read(), 'html.parser')
    content = soup.find("div", {'class':['field', 'content']})

    print(content)
    
def import_useful(base_dir):
  print("running")
  files = glob.glob(base_dir + '/**/*/index.html', recursive=True)
  for file in files:
    filename = file.replace(base_dir, "")
    if PATTERNS["BLOG"].match(filename):
      import_blog(file)

if __name__ == "__main__":
  import_useful("import/old_raw")