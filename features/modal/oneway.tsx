import React from "react";
import { Modal, Button, Image, Text, Link } from "@nextui-org/react";

export default function OneWay() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button auto flat color="error" onClick={handler}>
        Open modal
      </Button>
      <Modal noPadding open={visible} onClose={closeHandler}>
        <Modal.Header
          css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
        >
          <Text color="#363449">
            Photo by{" "}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://unsplash.com/@kadams77?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  
            >
            K Adams
            </Link>{" "}
            on{" "}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://unsplash.com/s/photos/one-way-sign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            >
              Unsplash
            </Link>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Image
            showSkeleton
            src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            width={400}
            height={490}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
