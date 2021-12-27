import Service from "../abstract/service";
import Api from "../../../apis/api.json";

class BlogService extends Service {
  constructor() {
    super(Api[window.location.host].PRODUCT_SERVICE_URL);
  }

  getPosts(userId) {
    return this.api.get("/blog-entry", { params: userId });
  }

  getPost(postId) {
    return this.api.get("/blog-entry/" + postId);
  }

  addPost(post) {
    return this.api.post("/blog-entry", post);
  }

  patchPost(patch) {
    return this.api.patch("/blog-entry", patch);
  }

  deletePost(id) {
    return this.api.delete("/blog-entry", { data: { id } });
  }
}

const blogService = new BlogService();

export default blogService;
