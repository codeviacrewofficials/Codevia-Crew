'use client';
import React from "react";
import Navbar from "@/components/Navbar";
import FancyThemeToggle from "@/components/FancyThemeToggle";
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
    <div style={{ background: "#121417", minHeight: "100vh" }}>
      <Navbar />
      <div className="flex justify-end p-4">
        <FancyThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4 text-gray-400 flex gap-2">
          <span>Work</span>
          <span>/</span>
          <span className="text-white">Client Success Story</span>
        </div>
        <Title level={2} style={{ color: "#fff" }}>Client Success Story</Title>
        <Card className="my-6" style={{ background: "#1f2124", borderRadius: 16 }}>
          <Title level={3} style={{ color: "#fff" }}>Project Overview</Title>
          <Paragraph style={{ color: "#fff" }}>
            We partnered with a leading tech startup to revamp their user interface, focusing on enhancing user engagement and streamlining the user journey. Our team conducted extensive user research, developed wireframes, and implemented a responsive design strategy to ensure a seamless experience across all devices.
          </Paragraph>
        </Card>
        <Title level={3} style={{ color: "#fff" }}>Design Process</Title>
        <div className="my-6">
          <Steps
            direction="vertical"
            current={3}
            items={steps.map((step) => ({
              title: <span style={{ color: "#fff" }}>{step.title}</span>,
              description: <span style={{ color: "#a3abb2" }}>{step.description}</span>,
            }))}
            style={{ color: "#fff" }}
          />
        </div>
        <Title level={3} style={{ color: "#fff" }}>Key Features</Title>
        <Row gutter={16} className="my-6">
          {features.map((feature) => (
            <Col xs={24} md={8} key={feature.title}>
              <Card style={{ background: "#1f2124", borderRadius: 12, color: "#fff" }}>
                <Title level={4} style={{ color: "#fff" }}>{feature.title}</Title>
              </Card>
            </Col>
          ))}
        </Row>
        <Title level={3} style={{ color: "#fff" }}>Results</Title>
        <Row gutter={16} className="my-6">
          {results.map((result) => (
            <Col xs={24} md={8} key={result.label}>
              <Card style={{ background: "#1f2124", borderRadius: 12, color: result.color }}>
                <Title level={4} style={{ color: "#fff" }}>{result.label}</Title>
                <Paragraph style={{ color: result.color, fontSize: 24, fontWeight: 700 }}>{result.value}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        <Title level={3} style={{ color: "#fff" }}>Client Testimonial</Title>
        <Card className="my-6" style={{ background: "#1f2124", borderRadius: 16 }}>
          <Paragraph style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
            "The new design has significantly improved our user experience and boosted our conversion rates. The team at Nova Designs was professional, creative, and delivered exceptional results."
          </Paragraph>
          <Paragraph style={{ color: "#fff" }}>Sarah Chen, CEO of Innovatech Solutions</Paragraph>
        </Card>
      </div>
      <footer className="text-center text-gray-400 py-8">@2024 Nova Designs. All rights reserved.</footer>
    </div>
  );
}
