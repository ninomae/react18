import React, { useState, useTransition, Suspense } from "react";
import { fetchProfileData } from "../../utils/fakeApi";
const initialResource = fetchProfileData(0);
const Transition: React.VFC = (_) => {
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {isPending && <div>Loading...</div>}
      <button
        onClick={() => {
          // 優先度の低いステート更新
          startTransition(() => {
            const nextUserId = getNextId(resource.userId);
            setResource(fetchProfileData(nextUserId));
          });
        }}
      >
        Next(トランジションあり)
      </button>
      <button
        onClick={() => {
          const nextUserId = getNextId(resource.userId);
          setResource(fetchProfileData(nextUserId));
        }}
      >
        Next(トランジションなし)
      </button>
      <ProfilePage resource={resource} />
    </>
  );
};
export default Transition;

function getNextId(id: number) {
  return id === 3 ? 0 : id + 1;
}

function ProfilePage({ resource }: any) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }: any) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }: any) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
