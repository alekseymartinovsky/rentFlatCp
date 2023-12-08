import { useContext, useEffect, useState } from "react";
import { CommentService } from "../../service/CommentService";
import { Comment as CommentModel } from "../../model/Comment";
import CreateCommentForm from "./CreateCommentForm";
import { RentFlat } from "../../model/RentFlat";
import { UserContext } from "../../App";
import Comment from "./Comment";
import { Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface CommentBlockProps {
    flat: RentFlat;
}

const CommentBlock = ({ flat }: CommentBlockProps) => {
    const [comments, setComments] = useState<CommentModel[]>([]);
    const { currentUser } = useContext(UserContext);
    const commentService = new CommentService();
    const [myComment, setMyComment] = useState<CommentModel>();
    const [loading, setLoading] = useState(true);
    const [isEditComment, setIsEditComment] = useState(false);

    useEffect(() => {
        commentService.getCommentsById(flat.id).then((comments: CommentModel[]) => {
            const myCommentIndex = comments.findIndex((comment) => comment.user.id != currentUser.id);
            if (myCommentIndex) {
                const c = comments.splice(myCommentIndex, 1)[0];
                setMyComment(c);
            }
            setComments([...comments]);
            setLoading(false);
        });
    }, []);

    const addComment = (text: string, rate: number) => {
        const comment = new CommentModel(myComment?.id ?? 0, text, rate, currentUser, flat);
        if (isEditComment) {
            setMyComment(comment);
            setIsEditComment(false);
            commentService.editComment(comment);
        } else {
            commentService.addComment(comment);
        }
    };

    return (
        <div className="commentBlock">
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    {myComment ? (
                        <div style={{ background: "gray" }}>
                            <div>
                                Ваш комментарий <EditOutlined rev onClick={() => setIsEditComment(true)} />
                            </div>
                            {isEditComment ? (
                                <CreateCommentForm confirm={addComment} editComment={myComment} />
                            ) : (
                                <Comment comment={myComment} />
                            )}
                        </div>
                    ) : (
                        <CreateCommentForm confirm={addComment} editComment={myComment} />
                    )}
                    <div className="commentBlockList">
                        {comments.map((comment) => (
                            <Comment comment={comment} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentBlock;
