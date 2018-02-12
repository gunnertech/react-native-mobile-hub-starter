/**
 * example:
 * 
 * comments :{
 *   new: {}, <----- where you'll store a new comment that hasn't been persisted yet
 *   data: [], <------ this is where you'll add comments that are retrieved for a list. Think a scrolling view of comments
 *   [commentId] <----- this is for caching a single comment object. When you retreive it, or created it, cache it using its partition key
 * }
 * 
 */

export default {
  app: {
    working: false
  },
  users: {
    current: {},
    data: []
  },

};