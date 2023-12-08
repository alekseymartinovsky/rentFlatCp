import { request } from "./fetchRequests";
import { Comment } from "../model/Comment";

const COMMENT_URL = "/comment";

export class CommentService {
    async getCommentsById(flatId: number): Promise<Comment[]> {
        return request
            .get(`${COMMENT_URL}/getByFlatId`, { id: flatId })
            .then((data: any) => data.map((commentData: any) => Comment.fromJson(commentData)));
    }

    async addComment(comment: Comment) {
        const data = {
            text: comment.text,
            rate: comment.rate,
            id: comment.id,
            user: comment.user.toJson(),
            flat: comment.flat.toJson(),
        };
        return request.post(COMMENT_URL, data).then((data: any) => {
            return Comment.fromJson(data);
        });
    }

    async editComment(comment: Comment) {
        return request.put(COMMENT_URL, comment.toJSON());
    }
}
