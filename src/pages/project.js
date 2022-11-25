import Article from "components/Article";
import Container from "components/Container";
import Header from "components/Header";
import Paragraph from "components/Paragraph";
import Title from "components/Title";
import Wrapper from "components/Wrapper";

const Post = () => {
  return (
    <Wrapper>
      <Container>
        <Article>
          <Header>project: cypher</Header>
          <Paragraph>
            In the last decade, the use of electronic gift cards has become
            widespread in almost all stores. In addition to these, our wallets
            are weighed down by bank cards, which the average person uses four
            times a day. The name of the project comes from the English word
            "cipher". Translated into Hungarian, it means cryptography or
            encryption. The name refers to the security of the technologies
            used. That with a single card we can enable the remote use of most
            of the devices we use every day, while also solving a growing health
            problem.
          </Paragraph>

          <Title>problem</Title>
          <Paragraph>
            In our preliminary research, we observed that the size of people's
            wallets is constantly increasing over the years. Although the use of
            cash is increasingly falling out of favor, we constantly need more
            bank cards and coupon cards. We believe that this pattern will not
            slow down in the near future. A thick wallet puts pressure on the
            human skeletal system during movement, which can cause many health
            problems. The most unpleasant of all is Piriformis syndrome. The
            asymmetry of the spine puts pressure on the sciatic nerve, which
            causes severe pain. Nowadays, this problem is becoming more and more
            common. On the other hand, who would want to carry several different
            cards when they are all based on the same technology and a device
            can emulate those devices?
          </Paragraph>

          <Title>solution</Title>
          <Paragraph>
            Our solution is a computer in the shape of a bank card, which can be
            used with almost all of the devices we use on a daily basis. The
            technologies required to create such a device already exist, but
            based on our experience so far, we have not found a compact solution
            that would implement all of them. When we dreamed up the project, we
            took the frameworks of the everyday devices that surround people
            and, based on their analysis, came to the conclusion that we could
            replace more than five devices.
          </Paragraph>
          <Paragraph>
            We also want to add Bluetooth Low Energy and WiFi functionality to
            our system. These are mainly needed for information management and
            security. Furthermore, the built-in flash memory will be encrypted
            according to military standards, so there is no need to worry even
            if the user loses the device.
          </Paragraph>

          <Title>social impact</Title>
          <Paragraph>
            In their opinion, by combining the aforementioned technologies, we
            can make people's everyday lives easier and even prevent a health
            problem. The fewer cards we carry with us will lead to fewer
            problems over time, and in the longer term to less plastic waste,
            thus we can create a more conscious and simpler life.
          </Paragraph>
        </Article>
      </Container>
    </Wrapper>
  );
};

export default Post;
