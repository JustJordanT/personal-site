import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hey Friends!
      </h1>

      <p className="mb-4">
        {`My name is Jordan some call me JT. I'm a Senior Platform Engineer
         and have been working a lot Go and .NET, and juggling a few side projects too.`}
      </p>
      <p className='mb-4'>
      Welcome to my corner of the inter webs! I'm a software engineer and I'm passionate about learning new things and sharing my knowledge with others.
      </p>
      <p>Check out my blog, project posts below to see what I've been up to!</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
