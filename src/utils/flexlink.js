import React from "react"
import { Link } from "gatsby"

export default class Stories extends React.Component {
  render() {
    const target = (this.props.to) || '';
    if (target.match(/http(.+)/)) {
      return (
        <a href={target} {...this.props}>{this.props.children}</a>
      );
    } else {
      return (
        <Link {...this.props}>{this.props.children}</Link>
      )
    }
  }
}
