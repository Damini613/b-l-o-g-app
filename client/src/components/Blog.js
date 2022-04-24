import React, { Component } from "react";
import "../App.css";

export default class Blog extends Component {
  constructor() {
    super();
    this.state = {
      filename: null,
      blogTitle: "",
      blogDesc: "",
      blogAuthor: "",
      blogTags: "",
      showGetBlogs: false,
    };
  }

  componentDidMount() {
    this.getMethod();
  }

  getMethod = async () => {
    try {
      const data = await fetch(`/`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) {
        const resp = await data.json();
        this.setState({
          data: resp,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleOnChange = (e) => {
    const name = e.target.name;
    this.setState(
      {
        [name]: e.target.value,
      },
      () => {
        console.log("state values", this.state);
      }
    );
  };

  handleOnChangeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState(
        {
          filename: URL.createObjectURL(img),
        },
        () => {
          console.log("%%%%%%%", this.state.filename);
        }
      );
    }
  };

  submitData() {
    const payload = {
      flieUpload: this.state.filename,
      title: this.state.blogTitle,
      description: this.state.blogDesc,
      creator: this.state.blogAuthor,
      tags: this.state.blogTags,
    };
    this.postMethod(payload);
  }

  postMethod = async (payload) => {
    try {
      const data = await fetch(`/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (data.status === 200) {
        const resp = await data.json();
        this.setState({
          showGetBlogs: true,
        });
        alert(resp.message);
      }
    } catch (error) {
      console.log(error);
    }
    this.getMethod();
  };
  render() {
    return (
      <div className="container blogCss">
        <label htmlFor="">Upload Blog Image</label>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => {
            this.handleOnChangeImage(e);
          }}
        />

        <input
          type="text"
          name="blogTitle"
          id="1"
          placeholder="Blog Title"
          value={this.state.blogTitle}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <textarea
          name="blogDesc"
          id="2"
          cols="30"
          rows="10"
          placeholder="Blog Description"
          value={this.state.blogDesc}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        ></textarea>
        <input
          type="text"
          name="blogAuthor"
          placeholder="Author name"
          id="3"
          value={this.state.blogAuthor}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <label htmlFor="">Tags(5 max seperated by comma)</label>
        <input
          type="text"
          name="blogTags"
          id="4"
          placeholder="Tags"
          value={this.state.blogTags}
          onChange={(e) => {
            this.handleOnChange(e);
          }}
        />
        <button onClick={() => this.submitData()}>Publish</button>
      </div>
    );
  }
}
