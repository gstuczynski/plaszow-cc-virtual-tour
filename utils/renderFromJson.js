import React from 'react';
import { View, Text, Image, Video, VideoControl, asset } from 'react-360';
import { string } from 'prop-types';
import _ from 'underscore';

const TextWrap = ({ content, style }) => {
  return <Text style={style}>{content}</Text>;
};

TextWrap.propTypes = {
  content: string.isRequired,
};

var Types = { Text, View: View, Image, Video, VideoControl };

const renderFromJson = obj => {
  let Type;
  if (obj.type === 'Text') {
    Type = TextWrap;
  } else {
    Type = Types[obj.type];
  }
  var children = obj.children ? obj.children.map(renderFromJson) : [];

  let source;
  if (obj.props && obj.props.source) {
    source = asset(`images/${obj.props.source}`);
    _.omit(obj.props, 'source');
  }

  return (
    <Type {...obj.props} source={source || null}>
      {children}
    </Type>
  );
};

export default renderFromJson;
