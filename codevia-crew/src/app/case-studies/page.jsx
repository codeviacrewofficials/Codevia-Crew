'use client';
import React from "react";
import Navbar from "@/components/Navbar";
import { Steps, Card, Row, Col, Typography, theme } from "antd";

const { Title, Paragraph } = Typography;

const steps = [
  {
    title: "Discovery & Research",
    description: "2 Weeks",
  },
  {
    title: "Wireframing & Prototyping",
    description: "3 Weeks",
  },
  {
    title: "Design & Development",
    description: "4 Weeks",
  },
  {
    title: "Testing & Launch",
    description: "1 Week",
  },
];

const features = [
  {
    title: "Interactive UI Elements",
  },
  {
    title: "User-Centric Design",
  },
  {
    title: "Responsive Layout",
  },
];

const results = [
  {
    label: "User Engagement",
    value: "+40%",
    color: "#0ad95c",
  },
  {
    label: "Conversion Rate",
    value: "+25%",
    color: "#0ad95c",
  },
  {
    label: "Customer Satisfaction",
    value: "95%",
    color: "#0ad95c",
  },
];

export default function CaseStudyPage() {
  return (
    <div className="bg-white dark:bg-[#121417] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4 text-[#697582] dark:text-gray-400 flex gap-2">
          <span>Work</span>
          <span>/</span>
          <span className="text-[#121417] dark:text-white">Client Success Story</span>
        </div>
        <Title level={2} className="text-[#121417] dark:text-white">Client Success Story</Title>
        <Card className="my-6 bg-white dark:bg-[#1f2124] border border-[#dee0e3] dark:border-[#232B3A] rounded-2xl">
          <Title level={3} className="text-[#121417] dark:text-white">Project Overview</Title>
          <Paragraph className="text-[#121417] dark:text-white">
            We partnered with a leading tech startup to revamp their user interface, focusing on enhancing user engagement and streamlining the user journey. Our team conducted extensive user research, developed wireframes, and implemented a responsive design strategy to ensure a seamless experience across all devices.
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
                <Paragraph className="text-[#088738] dark:text-[#0ad95c] text-2xl font-bold">{result.value}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        <Title level={3} className="text-[#121417] dark:text-white">Client Testimonial</Title>
        <Card className="my-6 bg-white dark:bg-[#1f2124] border border-[#dee0e3] dark:border-[#232B3A] rounded-2xl">
          <Paragraph className="text-[#121417] dark:text-white text-xl font-semibold">
            "The new design has significantly improved our user experience and boosted our conversion rates. The team at Nova Designs was professional, creative, and delivered exceptional results."
          </Paragraph>
          <Paragraph className="text-[#121417] dark:text-white">Sarah Chen, CEO of Innovatech Solutions</Paragraph>
        </Card>
      </div>
      <footer className="text-center text-[#697582] dark:text-gray-400 py-8">@2024 Nova Designs. All rights reserved.</footer>
    </div>
  );
}
