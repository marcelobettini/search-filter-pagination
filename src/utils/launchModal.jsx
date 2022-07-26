import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

export function openModal(item) {
  const Modal = lazy(() => import("../components/Modal"));
  const modalWrapper = document.createElement("div");
  modalWrapper.id = "modalWrapper";

  document.body.append(modalWrapper);

  const root = createRoot(modalWrapper);
  root.render(
    <Suspense fallback={<span>Loading Modal 😥</span>}>
      <Modal root={root} title={item.name}>
        <h2>Modal chiche bombón</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          placeat qui numquam quod nihil a aliquam ea odit, excepturi nesciunt?
          Id iste perspiciatis vitae, voluptatem laudantium libero doloribus
          consectetur mollitia.
        </p>
      </Modal>
    </Suspense>
  );
}
