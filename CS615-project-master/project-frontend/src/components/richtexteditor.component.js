import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
  }

  modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
    imageDrop: true,
    imageResize: {
      modules: ["Resize", "Toolbar", "DisplaySize"],
      toolbarStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          name={this.props.name}
          value={this.props.value}
          modules={this.modules}
          formats={this.formats}
          onChange={this.props.onChange}
          placeholder="start typing something..."
        />
      </div>
    );
  }
}

export default RichTextEditor;
