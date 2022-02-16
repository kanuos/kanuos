// import : internal
import { HeadComponent } from '../../components/Head'
import { BlogDetailBody } from '../../components/content/BlogDetailBody';
import { NavBar } from '../../components/public/Nav'

const BlogDetail = () => {
  return (
    <>
    <HeadComponent title={blog.name} />
    <NavBar />
    <BlogDetailBody blog={blog} />
    </>
  )
}

export default BlogDetail






const blog = {
    name : `How I implement JWT for authorization`,
    date : Date.now(),
    tags : ['Express', 'PostgreSQL', 'Session', 'EJS', 'Tailwind'],
    desc : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    page : [
        {
            segmentHeading : 'The Problem',
            content: [
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            ]
        },
        {
            segmentHeading : 'Breaking down the problem',
            content: [
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            ]
        },
        {
            segmentHeading : 'Solution',
            content: [
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero dui, accumsan ultricies cursus sed, efficitur in augue. Vestibulum ante ligula, pharetra et nulla mattis, consectetur eleifend nisi. Donec rhoncus neque ac augue luctus, eget condimentum eros tempus. Maecenas in magna in odio ultrices laoreet. Quisque quis rutrum nunc. Etiam fermentum ultricies lacinia. Pellentesque vel mollis libero. Aenean mollis ante justo, sit amet rutrum erat luctus at. In odio risus, cursus et porta et, dignissim eget felis. Quisque dolor risus, aliquet eu sollicitudin semper, luctus congue arcu. Nam quis sodales tortor, ac ullamcorper lorem. Nam ac egestas dui. Maecenas scelerisque massa turpis, nec laoreet libero vulputate a.

Mauris varius pharetra arcu. Cras at eros quis ligula sodales gravida. Quisque lobortis aliquet tortor eu finibus. Etiam tempus gravida urna, sed facilisis velit. Donec tristique ac justo at malesuada. Ut sodales leo felis, non vehicula magna sodales accumsan. Suspendisse nunc ex, rutrum non tristique id, fringilla id lacus. Praesent consectetur luctus mauris, eu tempor eros cursus eget. Curabitur dui quam, gravida eget justo eu, tempus tempus felis. Donec semper quam sed felis fringilla mattis. Fusce quis feugiat elit, et aliquet ipsum. Integer sollicitudin risus vel varius sodales.

Pellentesque sit amet odio sed felis finibus pharetra et id erat. Curabitur maximus est at metus pharetra imperdiet. Donec diam turpis, interdum vel nisi at, ornare scelerisque quam. Curabitur fermentum lacinia eros quis blandit. Etiam fringilla risus ipsum, eget consequat nibh pellentesque quis. Phasellus ultrices vel dui ac porttitor. Etiam porta condimentum urna, molestie venenatis sem congue nec. Fusce pellentesque lacinia egestas. Praesent ac varius tellus. Donec nec velit sit amet dolor finibus finibus. Fusce quam orci, fermentum finibus porttitor at, blandit vitae purus. Etiam rutrum tempus libero ut suscipit.

Morbi eu hendrerit leo. Maecenas sed metus bibendum, cursus diam at, blandit diam. Phasellus eget enim sit amet quam commodo ultrices. Nam neque diam, iaculis eu tincidunt a, commodo ac erat. Ut at ultrices arcu, id semper sapien. Nulla eu dictum ligula. Sed varius nibh dolor, quis facilisis lectus pellentesque sit amet. Aliquam semper feugiat cursus. Nam volutpat vulputate justo in pellentesque. Mauris fringilla gravida diam.

Cras at nisi ut elit sagittis elementum. Donec pellentesque, arcu vel gravida consequat, velit justo eleifend neque, eu venenatis libero urna et elit. Nunc a bibendum massa. Praesent ullamcorper, lectus vitae cursus accumsan, mauris libero mattis risus, vel vestibulum arcu dolor nec ipsum. Maecenas et lacinia elit, eget lacinia dolor. Curabitur eu viverra nulla. In nec tristique urna.`
            },
            {
                type : 'code',
                code : `def is_even(n):\n\treturn n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
    ],
    outro : {
        heading : 'conclusion',
        text : `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis ipsum totam rem ut, tempora architecto quas dolore suscipit blanditiis molestiae quisquam sed ullam earum facilis asperiores culpa minima accusantium possimus, recusandae voluptatem debitis similique quod. Libero iste recusandae nam culpa quasi aliquid, deserunt sunt non necessitatibus optio dolor accusantium natus.`,
        demo : `https://www.netlify.com/`,
    },
    isPublic : true,
    user : {
        name : 'sounak mukherjee',
        link : { text : '@kanuos', url : 'https://www.github.com/kanuos'},
        about : `Libero iste recusandae nam culpa quasi aliquid, deserunt sunt non necessitatibus optio dolor accusantium natus.`
    }
    
}