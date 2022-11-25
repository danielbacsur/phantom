import Article from "components/Article";
import Container from "components/Container";
import Header from "components/Header";
import Paragraph from "components/Paragraph";
import Wrapper from "components/Wrapper";
import Link from "next/link";

const Post = () => {
  return (
    <Wrapper>
      <Container>
        <Article>
          <Header>competition</Header>
          <Paragraph>
            The Hungarian Science and Innovation Olympiad is a competition
            hosted by the{" "}
            <Link
              href="https://www.innovacio.hu/en_index.html"
              className="underline"
            >
              Hungarian Innovation Association
            </Link>
            . You can apply with any innovative work, invention, or research
            result from the fields of engineering, natural science,
            environmental protection, IT, and mathematics, even from across the
            border. During the progress, the teams receive mentoring assistance
            to develop their project."
          </Paragraph>
          <Paragraph>
            Our team is currently at this stage, so our daily work is to further
            develop{" "}
            <Link href="/project" className="underline">
              cypher
            </Link>
            .
          </Paragraph>
          <Paragraph>
            At the end of the mentoring, there is the final, during which the
            jury selects 10 teams. The teams selected here have a chance to
            compete in international competitions, and there is also the
            opportunity to cooperate with different companies."
          </Paragraph>
          <Paragraph>
            To read more about our project, go to the{" "}
            <Link href="/project" className="underline">
              Project page
            </Link>
            .
          </Paragraph>
        </Article>
      </Container>
    </Wrapper>
  );
};

export default Post;
