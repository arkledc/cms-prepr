import Link from "next/link";
import { GetPosts } from "../queries/preprQueries";
import { prepr } from "../services/prepr";

function Home({ posts }) {
 return (
   <ul>
     {posts.map((post) => (
       <li key={post._id}>
         <Link href={`/post/${post._slug}`}>{post.title}</Link>
       </li>
     ))}
   </ul>
 );
}

export default Home;

export async function getStaticProps(context) {
 // Running GetPosts query using prepr client
 const postsData = await prepr.graphqlQuery(GetPosts).fetch();
 const posts = postsData.data.posts.items;

 // Passing posts as props
 return {
   props: { posts },
 };
}