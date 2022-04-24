import React, { Component } from "react";
import path3 from "./cross.jpg";

export default class GetBlogDetail extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      id: props.data,
    };
  }

  componentDidMount() {
    console.log("id", this.props.data);
    this.getMethod(this.state.id);
    console.log("&&&&&&&&&&&", this.getMethod(this.state.id));
  }

  getMethod = async (id) => {
    try {
      const data = await fetch(`/get/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) {
        const resp = await data.json();
        this.setState(
          {
            data: resp,
          },
          () => {
            console.log("$$$$", this.state.data);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="getBlogDetailCss">
        <div className="test">
          <button
            onClick={() => {
              this.props.closeModal();
            }}
          >
            <img src={path3} alt="" />
            Close
          </button>
        </div>
        <div className="test2">
          <div>
            <label htmlFor="">Title : </label>
            {this.state.data.title}
          </div>
          <div>
            <label htmlFor="">Description : </label>
            {this.state.data.description}
          </div>
          <div>
            <label htmlFor="">Creator : </label>
            {this.state.data.creator}
          </div>
          <div>
            <label htmlFor="">Creator At : </label>
            {this.state.data.createAt}
          </div>
          <div>
            <label htmlFor="">Tags : </label>
            {this.state.data.tags}
          </div>
        </div>
      </div>
    );
  }
}
