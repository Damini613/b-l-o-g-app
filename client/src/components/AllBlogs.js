import React, { Component } from "react";

import path from "./upvote.png";
import path2 from "./delete.png";
import path3 from "./edit.jpg";
export default class AllBlogs extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      img: null,
    };
  }

  componentDidMount() {
    this.getMethod();
  }

  imageGet = async () => {
    //   try{
    //     const data = await axios.get(`/`, {responseType: 'blob'})
    // //  const resp =await data.json()
    //  this.setState({
    //      img:data.fileUpload
    //  },()=>{
    //      console.log(data)
    //  })
    // }catch(err){
    //       console.log(err)
    //   }

    const res = await fetch(`/`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    let myImg = new Image();
    myImg.src = imageObjectURL.fileUpload;
    console.log("imag url", imageObjectURL);

    document.getElementById("myImg").appendChild(myImg);

    this.setState(
      {
        img: imageObjectURL,
      },
      () => {
        console.log("&&&&&&&", this.state.img);
      }
    );
  };

  getMethod = async () => {
    try {
      const data = await fetch(`/get`, {
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
            console.log("state data values", this.state.data);
          }
        );
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
  render() {
    return (
      <div>
        {this.state.data.map((x, index) => (
          <div key={index} className="cardsCss">
            <div className="editCss">
              <h2>{x.title}</h2>
              <img className="edit" src={path3} alt="" />
            </div>

            <h2>{x.description}</h2>
            <h2>{x.tags}</h2>
            <h2>{x.createAt}</h2>
            <h2>{x.creator}</h2>
            <div className="thiscss">
              <div>
                <img className="upvote" src={path} alt="" />
                {x.upvote}
              </div>
              <div>
                <button className="goToBlog" onClick={() => this.imageGet()}>
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
        <div id="myImg"></div>
        <img width="100px" height="100px" alt=".fff.." />
      </div>
    );
  }
}
