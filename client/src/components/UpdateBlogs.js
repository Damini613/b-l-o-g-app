import React, { Component } from "react";
import path3 from "./cross.jpg";

export default class UpdateBlogs extends Component {
  constructor(props) {
    super();
    this.state = {
      title: props.data.title,
      description: props.data.description,
      creator: props.data.creator,
      tags: props.data.tags,
    };
  }

  componentDidMount() {
    console.log("%%%%%%%", this.props.data);
  }

  handleOnChange = (e) => {
    const name = e.target.name;

    this.setState(
      {
        [name]: e.target.value,
      },
      () => {
        console.log("state 55555", this.state);
      }
    );
  };

  submitData = async (id) => {
    const payload = {
      title: this.state.title,
      description: this.state.description,
      creator: this.state.creator,
      tags: this.state.tags,
    };
    console.log("id", id);
    try {
      const data = await fetch(`/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (data.status === 200) {
        const resp = await data.json();
        // console.log("voted");
        alert(resp.message);
      }
    } catch (error) {
      console.log(error);
    }
    // this.props.getMethod();
    // console.log("get 777777", this.props.getMethod());

    this.props.closeModal();
    this.props.getMethod();
  };

  render() {
    return (
      <div className="updateCss">
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
        <input
          type="text"
          name="title"
          id="1"
          placeholder="Blog Title"
          value={this.state.title}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <textarea
          name="description"
          id="2"
          cols="30"
          rows="10"
          placeholder="Blog Description"
          value={this.state.description}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        ></textarea>
        <input
          type="text"
          name="creator"
          placeholder="Author name"
          id="3"
          value={this.state.creator}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <label htmlFor="">Tags(5 max seperated by comma)</label>
        <input
          type="text"
          name="tags"
          id="4"
          placeholder="Tags"
          value={this.state.tags}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <button onClick={() => this.submitData(this.props._id)}>Update</button>
      </div>
    );
  }
}
