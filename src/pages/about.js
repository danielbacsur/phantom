import Article from "components/Article";
import Container from "components/Container";
import Header from "components/Header";
import Subtitle from "components/Subtitle";
import Wrapper from "components/Wrapper";
import team from "static/team";

const Post = () => {
  return (
    <Wrapper>
      <Container>
        <Article>
          <Header>about</Header>
          <Subtitle>
            We are three academically interested high school students from
            Budapest, Hungary. We are all interested in cyber security, IT and
            innovation. This year we started designing a product that can make
            people's lives easier, with which we have performed well in several
            competitions so far. Here are our team members..
          </Subtitle>
        </Article>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:pt-[calc((100vh/4)-192px)]">
          {team.map((member) => (
            <div className="text-center flex flex-col p-8 max-w-md mx-auto">
              <img
                src={member.image}
                class="mx-auto h-64 w-64 rounded-full object-cover shadow-xl"
              />
              <span class="mt-8 text-lg font-bold font-lora">
                {member.name}
              </span>
              <p class="mt-2 text-xs text-gray-700 dark:text-gray-300">
                {member.role}
              </p>
              <p class="mt-4 text-sm text-gray-700 dark:text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Post;
