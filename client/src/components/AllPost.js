import React, { Component } from "react";
import AllBlogs from "./AllBlogs";
import Blog from "./Blog";
import "../App.css";

import path from "./upvote.png";
import path2 from "./delete.png";
import path3 from "./edit.jpg";
import UpdateBlogs from "./UpdateBlogs";
import GetBlogDetail from "./GetBlogDetail";
export default class AllPost extends Component {
  constructor() {
    super();
    this.state = {
      showGetBlogs: false,
      data: [],
      img: null,
      filename: null,
      blogTitle: "",
      blogDesc: "",
      blogAuthor: "",
      blogTags: "",
      upvote: 0,
      openUpdateModal: false,
      updateData: [],
      updateId: 0,
      goToBlog: false,
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

  deleteMethod = async (id) => {
    try {
      const data = await fetch(`/${id}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) {
        const resp = await data.json();
        alert(resp.message);
      }
    } catch (error) {
      console.log(error);
    }
    this.getMethod();
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

  upvoteMethod = async (id) => {
    console.log("id", id);
    try {
      const data = await fetch(`/${id}/likeedBlogPost`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) {
        // const resp = await data.json();
        console.log("voted");
        // alert(resp.message);
      }
    } catch (error) {
      console.log(error);
    }
    this.getMethod();
  };

  upVote = async (id) => {
    try {
      const data = await fetch(`/${id}/likeedBlogPost`, {
        method: "PATCH",

        headers: { "Content-Type": "application/json" },
      });

      if (data.status === 200) {
        console.log("Voted");
      }
    } catch (err) {
      console.log(err);
    }

    this.getMethod();
  };

  editMethod = async (id, x) => {
    this.setState({
      openUpdateModal: true,
      updateData: x,
      updateId: id,
    });
  };

  closeModal = () => {
    this.setState({
      openUpdateModal: false,
      goToBlog: false,
    });
  };

  goToBlog = (id, x) => {
    this.setState({
      goToBlog: true,
      updateData: x,
      updateId: id,
    });
  };
  render() {
    return (
      <div className="container-fluid" style={{ padding: 0 }}>
        <div className="container-fluid headerCss">Create your own Blog !!</div>

        {this.state.goToBlog && (
          <GetBlogDetail
            getMethod={this.getMethod}
            closeModal={this.closeModal}
            data={this.state.updateData}
            id={this.state.updateId}
          />
        )}

        {this.state.openUpdateModal && (
          <UpdateBlogs
            data={this.state.updateData}
            _id={this.state.updateId}
            closeModal={this.closeModal}
            getMethod={this.getMethod}
          />
        )}

        <div className="row">
          <div className="row">
            <div className="col-4">
              <div className="container blogCss">
                {/* <label htmlFor="">Upload Blog Image</label>
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => {
            this.handleOnChangeImage(e);
          }}
        /> */}

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
                <button className="publish" onClick={() => this.submitData()}>
                  Publish
                </button>
              </div>
            </div>
            <div className="col-8" style={{ height: "85vh", overflow: "auto" }}>
              <div>
                {this.state.data.map((x, index) => (
                  <div key={index} className="cardsCss">
                    <div className="editCss">
                      <h2>{x.title}</h2>
                      <img
                        onClick={() => this.editMethod(x._id, x)}
                        className="edit"
                        src={path3}
                        alt=""
                      />
                    </div>

                    <h2>{x.description}</h2>
                    <h2>{x.tags}</h2>
                    <h2>{x.createAt}</h2>
                    <h2>{x.creator}</h2>
                    <div className="thiscss">
                      <div>
                        <img
                          onClick={() => this.upvoteMethod(x._id)}
                          className="upvote"
                          src={path}
                          alt=""
                        />
                        {x.upvote}
                      </div>
                      <div>
                        <button
                          className="goToBlog"
                          onClick={() => this.goToBlog(x, x._id)}
                        >
                          Go to Blog
                        </button>
                      </div>

                      <div>
                        <img
                          onClick={() => this.deleteMethod(x._id)}
                          className="delete"
                          src={path2}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
