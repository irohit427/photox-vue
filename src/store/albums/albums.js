import { API, graphqlOperation } from 'aws-amplify';
import { createAlbum as createAlbumMutation } from "@/graphql/mutations";
import { getAlbum as getAlbumQuery } from "@/graphql/queries";
import { listAlbums as listAlbumsQuery } from '@/graphql/queries';

export const albumInfo = {
  namespaced: true,
  
  state: {
    error: null,
    albums: null
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload;
    }
  },
  actions: {
    async createAlbum({ dispatch }, newAlbum) {
      try {
        await API.graphql(graphqlOperation(createAlbumMutation, {input: newAlbum}));
        dispatch("getAlbumsList");
      } catch (error) {
        console.error("create album error");
      }
    },
    async getAlbum(_, albumId) {
      return await API.graphql(graphqlOperation(getAlbumQuery, {input: albumId}));
    },
    async getAlbumsList({commit}) {
      const albumsList = await API.graphql(graphqlOperation(listAlbumsQuery));
      commit("setAlbums", albumsList.data.listAlbums.items);
    }
  },
  getters: {
    albums(state) {
      return state.albums;
    }
  }

}