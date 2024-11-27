import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function CommentList({ comments }) {
  return (
    <List>
      {comments.map((comment) => (
        <ListItem key={comment.id} alignItems="flex-start"></ListItem>
      ))}
    </List>
  );
}
