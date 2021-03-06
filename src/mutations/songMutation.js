import { GraphQLNonNull, GraphQLID } from 'graphql';
import { GraphQLUpload } from 'apollo-server';
import { isAdminOrMore, unauthorized } from '../context';
import { songActions } from '../actions';
import { SongModel, SongInputModel } from '../types';

const createSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    song: { type: new GraphQLNonNull(SongInputModel) },
    imgUrl: { type: GraphQLUpload },
    songUrl: { type: GraphQLUpload },
  },
  resolve(parent, { imgUrl, songUrl, song }, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.createSong(imgUrl, songUrl, song) :
      unauthorized();
  },
};

const deleteSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { songId }, { userRole }) {
    return isAdminOrMore(userRole) && songId ?
      songActions.update(songId, { deleted: true }) :
      unauthorized();
  },
};

const disableSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { songId }, { userRole }) {
    return isAdminOrMore(userRole) && songId ?
      songActions.update(songId, { active: false }) :
      unauthorized();
  },
};

const enableSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { songId }, { userRole }) {
    return isAdminOrMore(userRole) && songId ?
      songActions.update(songId, { active: true }) :
      unauthorized();
  },
};

const restoreSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    songId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { songId }, { userRole }) {
    return isAdminOrMore(userRole) && songId ?
      songActions.update(songId, { deleted: false }) :
      unauthorized();
  },
};

const updateSong = {
  type: new GraphQLNonNull(SongModel),
  args: {
    song: { type: new GraphQLNonNull(SongInputModel) },
    imgUrl: { type: GraphQLUpload },
    songUrl: { type: GraphQLUpload },
  },
  resolve(parent, { imgUrl, songUrl, song }, { userRole }) {
    return isAdminOrMore(userRole) ?
      songActions.updateSong(imgUrl, songUrl, song) :
      unauthorized();
  },
};

export default {
  createSong,
  deleteSong,
  disableSong,
  enableSong,
  restoreSong,
  updateSong,
};
