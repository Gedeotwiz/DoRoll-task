import Link from "next/link";

interface NewsProp {
  title: string;
  description: string;
  date: string;
  link: string;
}
const News: React.FC<NewsProp> = ({ title, description, date, link }) => {
  return (
    <div className="shadow-md w-[700px] p-[20px]">
      <h2 role="date" className="text-right text-red-400 pb-[10px]">
        {date}
      </h2>
      <h1 role="heading" className="text-[24px] text-bold">
        {title}
      </h1>
      <p role="description" className="py-[10px]">
        {description}
      </p>
      <Link href={link} role="link" className="text-blue-600" >
          Continue to dev.to
      </Link>
    </div>
  );
};

export default News;
