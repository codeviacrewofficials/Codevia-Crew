'use client';
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Steps, Card, Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const steps = [
  {
    title: "Requirement Analysis",
    description: "2 days",
  },
  {
    title: "Wireframing & Prototyping",
    description: "1 Weeks",
  },
  {
    title: "Development & Integration",
    description: "2 Weeks",
  },
  {
    title: "Testing & Launch",
    description: "1 Week",
  },
];

const features = [
  {
    title: "Member Management",
  },
  {
    title: "Workout & Diet Tracking",
  },
  {
    title: "Automated Billing & Payment",
  },
];

const results = [
  {
    label: "Membership Growth",
    value: "+35%",
    color: "#0ad95c",
  },
  {
    label: "Retention Rate",
    value: "92%",
    color: "#0ad95c",
  },
  {
    label: "Client Satisfaction",
    value: "98%",
    color: "#0ad95c",
  },
];

export default function CaseStudyPage() {
  return (
    <div className="bg-white dark:bg-[#1A202C] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <Title level={2} className="text-[#121417] dark:text-white">Client Success Story</Title>

        <Card className="my-6 bg-white dark:bg-[#1f2124] border border-[#dee0e3] dark:border-[#232B3A] rounded-2xl">
          <Title level={3} className="text-[#121417] dark:text-white">Project Overview</Title>
          <Paragraph className="text-[#121417] dark:text-white">
            We collaborated with Zutok Fitness to develop a comprehensive Gym CRM system. The solution centralizes member management, tracks workouts and diet plans, automates billing, and provides actionable insights to improve member engagement and retention. Our design ensured a responsive, intuitive interface suitable for trainers and clients alike.
          </Paragraph>
        </Card>

        <Title level={3} className="text-[#121417] dark:text-white">Design Process</Title>
        <div className="my-6">
          <Steps
            direction="vertical"
            current={3}
            items={steps.map((step) => ({
              title: <span className="text-[#121417] dark:text-white">{step.title}</span>,
              description: <span className="text-[#697582] dark:text-[#a3abb2]">{step.description}</span>,
            }))}
            className="text-[#121417] dark:text-white"
          />
        </div>

        <Title level={3} className="text-[#121417] dark:text-white">Key Features</Title>
        <Row gutter={16} className="my-6">
          {features.map((feature) => (
            <Col xs={24} md={8} key={feature.title}>
              <Card className="bg-white dark:bg-[#1f2124] border border-[#dee0e3] dark:border-[#232B3A] rounded-lg">
                <Title level={4} className="text-[#121417] dark:text-white">{feature.title}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        <Title level={3} className="text-[#121417] dark:text-white">Results</Title>
        <Row gutter={16} className="my-6">
          {results.map((result) => (
            <Col xs={24} md={8} key={result.label}>
              <Card className="bg-white dark:bg-[#1f2124] border border-[#dee0e3] dark:border-[#232B3A] rounded-lg">
                <Title level={4} className="text-[#121417] dark:text-white">{result.label}</Title>
                <Paragraph className="text-[#0ad95c] dark:text-[#0ad95c] text-2xl font-bold">{result.value}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Title level={3} className="text-[#121417] dark:text-white">Client Testimonial</Title>
        <Card className="my-6 bg-white dark:bg-[#1f2124] border border-[#dee0e3] dark:border-[#232B3A] rounded-2xl">
          <Paragraph className="text-[#121417] dark:text-white text-xl font-semibold">
            "Codevia Crew built a Gym CRM system that completely transformed how we manage our members. Workouts, billing, and tracking are now seamless, and our members love the smooth experience!"
          </Paragraph>
          <Paragraph className="text-[#121417] dark:text-white">Owner of Zutok Fitness</Paragraph>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
