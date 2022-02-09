// import : built in
import Image from 'next/image';

// import : external
import ReactMarkdown from 'react-markdown';

// import : internal
import { HeadComponent } from '../../components/Head'
import { DescHeader } from '../../components/public/DescHeader';
import { Signature } from '../../components/public/Signature';
import { CLIENT_TYPE } from '../../utils';

const BlogDetail = () => {
  return (
    <>
    <HeadComponent title={blog.name} />
    {/* navbar goes here */}
    <main className='px-8 md:px-16 h-auto w-full min-h-screen relative'>
        {/* background image */}
        <Image layout='fill' src="/hero.jpg" className='fixed left-0 top-0 h-screen w-screen object-cover pointer-events-none opacity-30' />
        
        <div className="relative h-full w-full">
            <DescHeader 
                name={blog.name}
                date={blog.date}
                tags = {blog.tags}
                back={CLIENT_TYPE.blog.url}
                descType={CLIENT_TYPE.blog.name} />

            <section className='w-full max-w-4xl mx-auto flex flex-col items-start justify-start gap-y-6 opacity-80 text-dark'>
                <p className='leading-relaxed first-letter:text-6xl md:text-lg'>
                    {blog.desc}
                </p>
                <article className='prose whitespace-pre-line prose-headings:font-special w-full max-w-4xl'>
                    {console.log(blog.page.toString())}
                   <ReactMarkdown children={blog.page}></ReactMarkdown>
                </article>
            </section>
            
            <section className="py-10">
                <Signature />
            </section>

        </div>


    </main>
    </>
  )
}

export default BlogDetail





const blog = {
    name : `How I implement JWT for authorization`,
    date : Date.now(),
    tags : ['Express', 'PostgreSQL', 'Session', 'EJS', 'Tailwind'],
    desc : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    page : "## h1 header \n\n"+ 

    
"Paragraphs are separated by a blank line.\n" +     
    "2nd paragraph. *Italic*, **bold**, and . Itemized lists \n" +
    "look like:\n"+
    
"* this one\n"+
"* that one\n"+
"* the other one\n"+
    
    "Note that --- not considering the asterisk --- the actual text\n"+
    "content starts at 4-columns in.\n"+
    
    "> Block quotes are\n"+
    "> written like so.\n"+
    ">\n"+
    "> They can span multiple paragraphs,\n"+
    "> if you like.\n\n"+
    
    "Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\n"+
    "in chapters 12--14\"). Three dots ... will be converted to an ellipsis.\n"+
    "Unicode is supported. ☺\n\n\n"+
    
    
    "~~~python\n"+
    "import time\n" +
    "# Quick, count to ten\n" +
    "for i in range(10):\n" + 
    "    # (but not *too* quick)\n"+
    "    time.sleep(0.5)\n"+
    "    print i\n"+
    "~~~"
    
    
}