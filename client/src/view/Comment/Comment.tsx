import { Rate } from "antd";
import { Comment as CommentModel } from "../../model/Comment";
import "./CommentBlock.css";

interface CommentProps {
    comment: CommentModel;
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <div className="comment">
            <div>{comment.user.login}</div>
            <Rate allowHalf defaultValue={comment.rate / 2} disabled />
            <div>{comment.text}</div>
        </div>
    );
};

export default Comment;
