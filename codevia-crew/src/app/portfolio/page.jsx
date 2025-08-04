"use client";

import { Card, Typography, Row, Col, Avatar } from "antd";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTheme } from "../../components/ThemeProvider";

// Figma image assets
// Figma image assets for light and dark theme
const lightImgs = {
  imgDepth7Frame0: "http://localhost:3845/assets/ed7ff537c17ea15b731aa32a41f8a4d6fd45ddeb.png",
  imgDepth7Frame1: "http://localhost:3845/assets/bbb7543930c815fe563c4a50956c14afd76ea5dd.png",
  imgDepth7Frame2: "http://localhost:3845/assets/266ee5c987b7f8613bf14ed5774a58287e2ccb0c.png",
  imgDepth8Frame0: "http://localhost:3845/assets/b582ef14efb872b91a203eda3b5b368bc07f3f30.png",
  imgDepth8Frame1: "http://localhost:3845/assets/9d95d741a087edc69127cc98bbee72d60982d99a.png",
  imgDepth8Frame2: "http://localhost:3845/assets/f02caa1b6af1863ba5176a53ad07e29b430fa7df.png",
  imgDepth7Frame3: "http://localhost:3845/assets/8a6243e258a6b06c6f65dfc0a24bc5eca96f3ddc.png",
  imgDepth7Frame4: "http://localhost:3845/assets/251b9a287e53d4c753bb09d52f98bd4b5f22df85.png",
  imgDepth7Frame5: "http://localhost:3845/assets/30e57c082e7764f643edda5efc4dcedc94a19238.png",
};
const darkImgs = {
  imgDepth7Frame0: "http://localhost:3845/assets/45c06286cd6c1afae831c62a9d4d77a4828a35de.png",
  imgDepth7Frame1: "http://localhost:3845/assets/e5ef43e6f3ab6569c05035faf941b10d98753d11.png",
  imgDepth7Frame2: "http://localhost:3845/assets/9b6057e6798924b954ecd92ad860c39f3994a677.png",
  imgDepth8Frame0: "http://localhost:3845/assets/9657bc54deca8463edc11c2a49136a9dee881989.png",
  imgDepth8Frame1: "http://localhost:3845/assets/e507d33e6b533f25ccca6b7a424dd1f7ab32b777.png",
  imgDepth8Frame2: "http://localhost:3845/assets/e119fa81af9bff9c5bc86fe61d5a685b5fd238c7.png",
  imgDepth7Frame3: "http://localhost:3845/assets/0ba92548df500da9e02d964e86a7918f85b39db9.png",
  imgDepth7Frame4: "http://localhost:3845/assets/30fa810c173093106beb8be03dd42ed88b18e405.png",
  imgDepth7Frame5: "http://localhost:3845/assets/8d58e8e23a205965112b34c0fe2e1f9395d56ba5.png",
};

export default function PortfolioPage() {
  const { dark } = useTheme();
  // Select correct images and color palette based on theme
  const imgs = dark ? darkImgs : lightImgs;
  const palette = {
    bg: dark ? "bg-[#121417]" : "bg-white",
    textMain: dark ? "!text-white" : "!text-[#121417]",
    textSub: dark ? "!text-[#9eabba]" : "!text-[#697582]",
    card: dark ? "bg-[#181C23] border-none" : "bg-white border border-[#e5e8eb]",
    cardTitle: dark ? "!text-white" : "!text-[#121417]",
    cardSub: dark ? "!text-[#9eabba]" : "!text-[#697582]",
    avatarText: dark ? "!text-white" : "!text-[#121417]",
    avatarSub: dark ? "!text-[#9eabba]" : "!text-[#697582]",
  };
  return (
    <div className={`min-h-screen w-full ${palette.bg} transition-colors duration-300`}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Typography.Title level={1} className={`!text-4xl !mb-2 ${palette.textMain}`}>Our Portfolio</Typography.Title>
        <Typography.Paragraph className={`!mb-8 ${palette.textSub}`}>
          Explore our diverse range of projects, showcasing our expertise in web development, mobile apps, and digital marketing. Each project reflects our commitment to quality and innovation. Interact with the elements to discover more about our work.
        </Typography.Paragraph>

        <Typography.Title level={2} className={`!text-2xl !mb-4 ${palette.textMain}`}>Featured Projects</Typography.Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              hoverable
              cover={<img src={imgs.imgDepth7Frame0} alt="E-commerce Platform for Local Artisans" className="rounded-xl h-44 object-cover" />}
              className={palette.card}
            >
              <Typography.Title level={4} className={palette.cardTitle}>E-commerce Platform for Local Artisans</Typography.Title>
              <Typography.Paragraph className={palette.cardSub}>
                A robust e-commerce platform connecting local artisans with a global market. Hover to see animated details.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              cover={<img src={imgs.imgDepth7Frame1} alt="Mobile App for Fitness Tracking" className="rounded-xl h-44 object-cover" />}
              className={palette.card}
            >
              <Typography.Title level={4} className={palette.cardTitle}>Mobile App for Fitness Tracking</Typography.Title>
              <Typography.Paragraph className={palette.cardSub}>
                A user-friendly mobile app for tracking fitness goals and progress. Tap to reveal interactive features.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              cover={<img src={imgs.imgDepth7Frame2} alt="Website Redesign for a Non-Profit" className="rounded-xl h-44 object-cover" />}
              className={palette.card}
            >
              <Typography.Title level={4} className={palette.cardTitle}>Website Redesign for a Non-Profit</Typography.Title>
              <Typography.Paragraph className={palette.cardSub}>
                A modern and responsive website redesign for a non-profit organization. Scroll to see the transformation.
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>

        <Typography.Title level={2} className={`!text-2xl !mt-12 !mb-4 ${palette.textMain}`}>Meet Our Team</Typography.Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className={palette.card}>
              <Avatar src={imgs.imgDepth8Frame0} size={120} className="mx-auto mb-4" />
              <Typography.Title level={4} className={`text-center !mb-1 !mt-0 ${palette.avatarText}`}>Ethan Harper</Typography.Title>
              <Typography.Paragraph className={`text-center !mb-0 ${palette.avatarSub}`}>Lead Developer - Click for a 3D profile view</Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className={palette.card}>
              <Avatar src={imgs.imgDepth8Frame1} size={120} className="mx-auto mb-4" />
              <Typography.Title level={4} className={`text-center !mb-1 !mt-0 ${palette.avatarText}`}>Olivia Bennett</Typography.Title>
              <Typography.Paragraph className={`text-center !mb-0 ${palette.avatarSub}`}>UI/UX Designer - Hover for animated bio</Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className={palette.card}>
              <Avatar src={imgs.imgDepth8Frame2} size={120} className="mx-auto mb-4" />
              <Typography.Title level={4} className={`text-center !mb-1 !mt-0 ${palette.avatarText}`}>Noah Carter</Typography.Title>
              <Typography.Paragraph className={`text-center !mb-0 ${palette.avatarSub}`}>Project Manager - Tap to see project timeline</Typography.Paragraph>
            </Card>
          </Col>
        </Row>

        <Typography.Title level={2} className={`!text-2xl !mt-12 !mb-4 ${palette.textMain}`}>Client Testimonials</Typography.Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className={palette.card}>
              <div className="flex items-center gap-3 mb-2">
                <Avatar src={imgs.imgDepth7Frame3} size={40} />
                <div>
                  <Typography.Text className={palette.avatarText}>Sophia Clark</Typography.Text>
                  <div className={`text-xs ${palette.avatarSub}`}>2023-08-15</div>
                </div>
              </div>
              <Typography.Paragraph className={palette.avatarText}>
                "Innovatech Solutions transformed our online presence with their exceptional web development skills. Their team was professional, responsive, and delivered beyond our expectations. Click to see an animated case study."
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className={palette.card}>
              <div className="flex items-center gap-3 mb-2">
                <Avatar src={imgs.imgDepth7Frame4} size={40} />
                <div>
                  <Typography.Text className={palette.avatarText}>Liam Davis</Typography.Text>
                  <div className={`text-xs ${palette.avatarSub}`}>2023-07-22</div>
                </div>
              </div>
              <Typography.Paragraph className={palette.avatarText}>
                "The mobile app developed by Innovatech Solutions has revolutionized our business operations. It's intuitive, efficient, and has significantly improved customer engagement. Tap to see interactive app demos."
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className={palette.card}>
              <div className="flex items-center gap-3 mb-2">
                <Avatar src={imgs.imgDepth7Frame5} size={40} />
                <div>
                  <Typography.Text className={palette.avatarText}>Ava Wilson</Typography.Text>
                  <div className={`text-xs ${palette.avatarSub}`}>2023-06-10</div>
                </div>
              </div>
              <Typography.Paragraph className={palette.avatarText}>
                "We appreciate the creativity and attention to detail Innovatech Solutions brought to our website redesign. While there were minor delays, the final product is impressive. Scroll to see before-and-after animations."
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}
