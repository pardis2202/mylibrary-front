import { Link } from 'react-router-dom';
const Articles = () => {
  const ArticlePosts = [
    {
      id: 1,
      title: "Why Algorithm-Generated Recommendations Fall Short",
      date: "January 09, 2024",
      author: "by Carey K. Morewedge",
      summary: "The online systems that make recommendations to us often rely on their digital footprint — our clicks, views, purchases, and other digital footprints — to infer our preferences. But this means that human biases are baked into the algorithms. To build algorithms that more effectively predict users’ true preferences and better enhance consumer well-being and social welfare, organizations need to employ ways to measure user preferences that take into account these biases. This article explains how to do so.",
      image: "https://hbr.org/resources/images/article_assets/2024/01/Jan24_09_86088037-2.jpg",
      Url: "https://hbr.org/2024/01/why-algorithm-generated-recommendations-fall-short",
    },
    {
      id: 2,
      title: "30 Things I know at 30 that I wish I knew at 20",
      date: "October 8, 2024",
      author: "by Zach ",
      summary: "I just turned 30, and there are things I absolutely wish someone had told me 10 years ago. Apparently, turning 30 is a big milestone. No more 20s. Am I an adult now?I wanted to reflect on every unique life lesson I’ve been taught in the past 10 years regarding personal growth, money, health and wellness, and time management.",
      image: "https://zhighley.com/wp-content/uploads/2024/10/Zach-Drawing-06_title.jpg",
      Url:"https://zhighley.com/30-things-i-know-at-30-that-i-wish-i-knew-at-20/",
    },
    {
      id: 3,
      title: "What Did People Do Before Smartphones?",
      date: "July 7, 2023",
      author: "By Ian Bogost",
      summary: "Before smartphones, boredom was a common experience that allowed people to engage in introspection, creativity, and mental rest. With the rise of digital devices, constant entertainment and information have replaced these moments, potentially limiting the benefits of boredom for mental well-being and personal reflection.",
      image: "https://cdn.theatlantic.com/thumbor/twNMJ7obOdmBzUcOtLTWllI0MUw=/0x0:4800x2700/976x549/media/img/mt/2023/07/pre_smartphone_1/original.jpg",
      Url:"https://www.theatlantic.com/technology/archive/2023/07/before-smartphones-boredom/674631/"
    },
    {
        id: 4,
        title: "How I Learned to Concentrate",
        date: "March 5, 2024",
        author: "By Cal Newport",
        summary: "Twenty years ago, I had an intellectual experience that changed how I think about thinking.",
        image: "https://media.newyorker.com/photos/65e72b23f1e5b458b9c72594/16:9/w_1920,c_limit/Newport-New-Thinking.jpg",
        Url:"https://www.newyorker.com/culture/office-space/how-i-learned-to-concentrate"
      },
      {
        id: 5,
        title: "On the Bad Binary of “Good” and “Bad” Literature",
        date: "August 23, 2023",
        author: "By Josh Cook",
        summary: "Readers all over the country seek out my staff picks. They regularly take my recommendations both in-store and online. I can sometimes hand a book to a familiar customer and tell them to buy it with no other explanation and they will. One reader trusts me enough that she purchased a gift card that she keeps at the store so I can buy and set aside for her any book I see that I think she’ll like.",
        image: "https://s26162.pcdn.co/wp-content/uploads/2023/08/literary_critic_head_in_books_2.jpeg",
        Url:"https://lithub.com/on-the-bad-binary-of-good-and-bad-literature/"
      },
      {
        id: 6,
        title: "What Does Your Sleeping Position Say About Your Personality and Health?",
        date: " February 26, 2021",
        author: "Medically reviewed by Raj Dasgupta, MD — Written by Crystal Raypole ",
        summary: "Your sleeping position can reveal aspects of your personality and physical health. For example, sleeping on your back may indicate self-confidence, while sleeping on your side could suggest a more easygoing nature, and certain positions may also affect sleep quality and comfort.",
        image: "https://post.healthline.com/wp-content/uploads/2021/01/943227-What-Does-Your-Sleeping-Position-Say-About-Your-Personality-and-Health-1296x728-Header.png",
        Url:"https://www.healthline.com/health/healthy-sleep/what-does-your-sleeping-position-say-about-you"
      },
      {
        id: 6,
        title: "Nick Bostrom Made the World Fear AI. Now He Asks: What if It Fixes Everything?",
        date: " May 2, 2024",
        author: "by Will Knight",
        summary: "Philosopher Nick Bostrom popularized the idea superintelligent AI could erase humanity. His new book imagines a world in which algorithms have solved every problem.",
        image: "https://media.wired.com/photos/6632b993567f2636ab174f47/master/w_1920,c_limit/Nick-Bostrom-Business-GettyImages-502680318.jpg",
        Url:"https://www.wired.com/story/nick-bostrom-fear-ai-fix-everything/"
      },
      {
        id: 7,
        title: "“The self” doesn’t exist. Instead, you constantly shape multiple selves",
        date: " March 28, 2023",
        author: "Excerpted from the book: SELFLESS by Brian Lowery. Copyright © 2023 by Brian Lowery. Reprinted courtesy of Harper, an imprint of HarperCollins Publishers.",
        summary: "We bring multifaceted selves to our interactions, and in these interactions co-create each other again and again. ",
        image: "https://bigthink.com/wp-content/uploads/2023/03/faces.jpg?resize=640,360",
        Url:"https://bigthink.com/thinking/selfless-book/"
      },
      {
        id: 8,
        title: "MIT’s New AI Model Predicts Human Behavior With Uncanny Accuracy",
        date: "April 19, 2024",
        author: "By Adam Zewe, Massachusetts Institute of Technology",
        summary: "Researchers at MIT and the University of Washington have developed a new method for modeling the decision-making behaviors of agents, taking into account computational constraints. This model, which can predict future actions from past behavior, aims to improve AI systems’ collaboration with humans by understanding and adapting to human irrationalities and decision-making processes.",
        image: "https://scitechdaily.com/images/Abstract-Human-Behavior-Art-Concept-777x518.jpg",
        Url:"https://scitechdaily.com/mits-new-ai-model-predicts-human-behavior-with-uncanny-accuracy/"
      },
      {
        id: 9,
        title: "Scientists Develop Breakthrough Nasal Spray That Could Delay Alzheimer’s by Over a Decade",
        date: "November 13, 2024",
        author: "By Texas A&M University",
        summary: "A new nasal spray therapy by Texas A&M researchers shows promise in delaying Alzheimer’s progression by targeting brain inflammation and reducing harmful proteins. Tested in animal models, it may extend cognitive function by 10-15 years, offering a potential breakthrough in Alzheimer’s treatment.",
        image: "https://scitechdaily.com/images/Human-Brain-Anatomy-Illustration-777x583.jpg",
        Url:"https://scitechdaily.com/scientists-develop-breakthrough-nasal-spray-that-could-delay-alzheimers-by-over-a-decade/"
      },
      {
        id: 10,
        title: "Rewriting Textbooks: Geologists Uncover New Secrets in the Ancient Layers of the Grand Canyon",
        date: "November 14, 2024",
        author: "By Utah State University",
        summary: "Edwin McKee’s groundbreaking work on the Grand Canyon’s geology has been revisited by a modern team, revealing new insights into ancient climate and life. This research highlights the evolving nature of science and deepens our connection to Earth’s history.",
        image: "https://scitechdaily.com/images/Grand-Canyon-1200x800.jpg",
        Url:"https://scitechdaily.com/rewriting-textbooks-geologists-uncover-new-secrets-in-the-ancient-layers-of-the-grand-canyon/"
      },
      {
        id: 11,
        title: "Frozen Carbon Unleashed: Arctic Meltdown Accelerates Climate Crisis",
        date: "November 13, 2024",
        author: "By Jet Propulsion Laboratory",
        summary: "Recent NASA research highlights the Arctic permafrost as a net source of greenhouse gases over the past 20 years, driven by methane emissions from lakes and wetlands and carbon dioxide from wildfires.",
        image: "https://scitechdaily.com/images/Permafrost-Summer-Norway-1200x800.jpg",
        Url:"https://scitechdaily.com/frozen-carbon-unleashed-arctic-meltdown-accelerates-climate-crisis/"
      }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl w-full">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Articles to read</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ArticlePosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={post.image}
              alt={post.title}
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                By {post.author} | {post.date}
              </p>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <Link to={post.Url} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Articles;