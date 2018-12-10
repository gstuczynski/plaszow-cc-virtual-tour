import { string, number, arrayOf, shape, object } from 'prop-types';

export default {
  uri: string.isRequired,
  sceneId: string.isRequired,
  doors: arrayOf(
    shape({
      sceneId: string,
      preview: string,
      title: string,
      location: shape({
        left: number,
        top: number,
      }),
    })
  ),
  infoPanels: arrayOf(
    shape({
      title: string,
      location: shape({
        left: number,
        top: number,
      }),
      icon: string,
      sections: arrayOf(
        shape({
          type: string,
          infoSource: string,
          props: shape(object),
          children: arrayOf(object),
        })
      ),
    })
  ),
};
