import React from 'react';
import { View, Text, Image, Video, VideoControl, MediaPlayerState } from 'react-360';

const TextWrap = ({ content }) => <Text>{this.content}</Text>;

var Types = { Text, View, Image, Video, VideoControl };
function renderFromJson(obj) {
  let Type
  if (obj.type === "Text"){
    Type = "TextWrap"
  } else {
    Type = Types[obj.type];
  }
  var children = obj.children ? obj.children.map(renderFromJson) : [];
  console.log(<Type {...obj.props}>{children}</Type>)
  return <Type {...obj.props}>{children}</Type>;
}

export default renderFromJson;
