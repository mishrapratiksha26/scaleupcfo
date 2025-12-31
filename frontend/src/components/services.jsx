// src/components/Services.jsx

import confusedMan from "../assets/services_images/confusedman.ae6c3802f3cb6d28874e.png";

import cmIcon from "../assets/services_images/CM.13b4e1c594aea26c025b.jpg";
import tsmIcon from "../assets/services_images/TSM.cf8e6d94d66d4aed30db.jpg";
import bbfIcon from "../assets/services_images/BBF.45d30127bf88be23c67c.jpg";
import abIcon from "../assets/services_images/AB.f91b000fc8b9571a2ea3.jpg";

import step1Img from "../assets/services_images/step-1.d50f6bb795fa3391c4da.jpg";
import step2Img from "../assets/services_images/step-2.05071d4a3b4cccb0cf83.jpg";
import step3Img from "../assets/services_images/step-3.f15334757068ed1af872.jpg";

import dartIcon from "../assets/services_images/dart.d34b72c6d0983115804e.jpg";
import irIcon from "../assets/services_images/IR.7333a6914134f6a19915.jpg";
import pfIcon from "../assets/services_images/PF.b2193833143a2e7f2ac4.jpg";
import fmIcon from "../assets/services_images/PF.b2193833143a2e7f2ac4.jpg";
import { color } from "motion";

// src/components/Services.jsx

// const iconStyle = { filter: "brightness(0) invert(1)" };

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%)",
        color: "#ffffff",
        paddingTop: "8rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="container">

        {/* ================= Block 1 – Pain Points ================= */}
        <section
          className="why-choose-us-section"
          style={{ position: "relative", minHeight: "300px" }}
        >
          <h1
            style={{
              color: "#ffffff",
              fontSize: "3rem",
              marginBottom: "2rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            Financial Complexities slowing you down?
          </h1>

          <div className="why-choose-us-grid">
            <section className="dual-thoughts-section">
              <div className="person-container">
                <img
                  src={confusedMan}
                  alt="Confused Founder"
                  className="person-image"
                  style={{
                    maxWidth: "100%",
                    opacity: 0.95,
                  }}
                />
              </div>
            </section>

            <section className="why-choose-us" style={{paddingBottom:"0",paddingTop:"0"}}>
              <ul className="thought-list">
                {[
                  { img: cmIcon, text: "Growing Financial Complexities" },
                  { img: tsmIcon, text: "Investors asking more than just numbers" },
                  { img: bbfIcon, text: "Cash burn visibility not clear" },
                  { img: abIcon, text: "Worried about fund raise & valuation" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="thought-item"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                  >
                    <img src={item.img} alt="" className="service-icon" />

                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        {/* ================= Block 2 ================= */}
        <section
          className="why-need-us-section"
          style={{ position: "relative" }}
        >
          <div className="why-need-us-grid">
            <h3 style={{ fontSize: "2.5rem", color: "white" }}>
              Your Startup <br />
              Needs More Than <br />
              Just a Numbers Person...
            </h3>

            <section className="why-choose-finbook" style={{paddingTop:"0"}}>
              <h3 style={{ color: "#34D399", marginBottom: "2rem" }}>
                Strategic CFO Partner who can
              </h3>

              <ul className="reasons-list">
                {[
                  { img: bbfIcon, text: "Lead fund raise and investor outreach" },
                  { img: abIcon, text: "Build narratives from numbers" },
                  { img: cmIcon, text: "Optimize cash burn for growth" },
                  { img: tsmIcon, text: "Understand investor expectations" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="reason-item"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <img src={item.img} alt="" className="service-icon" />

                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        {/* ================= Block 3 – Process ================= */}
        <section className="process-container">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "white", marginTop: "0" }}>
            Our Process, Your Insights!
          </h2>

          <div className="process-grid">
            {[
              {
                img: step1Img,
                title: "Consultation & Discovery",
                text:
                  "Detailed discovery workshop to understand your growth objectives and financial needs.",
              },
              {
                img: step2Img,
                title: "Financial Visibility Assessment",
                text:
                  "Identify inefficiencies, cash flow gaps and KPI tracking issues.",
              },
              {
                img: step3Img,
                title: "Real-time Insights & Weekly Sync-up",
                text:
                  "Custom KPI dashboards, investor-ready reports and pitch materials.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="process-step"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <img src={step.img} alt="" />
                <div className="process-step-content">
                  <h3 style={{ color: "#34D399" }}>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= Block 4 – CFO Offerings ================= */}
        <section className="virtual-cfo-section">
          <h2 className="section-title">Our CFO Offerings...</h2>

          <div className="services-blocks-main">
            {[
              [
                { img: dartIcon, text: "Financial Advisory in Decision Making" },
                { img: irIcon, text: "Investor Reporting & Relations" },
                { img: cmIcon, text: "Cashflow Management & Forecasting" },
                { img: abIcon, text: "Accounting & Bookkeeping" },
              ],
              [
                { img: pfIcon, text: "Pitch Deck & Fundraising" },
                { img: tsmIcon, text: "Term Sheet & SHA Management" },
                { img: fmIcon, text: "Financial Modelling" },
                { img: bbfIcon, text: "Business Budgeting & Forecasting" },
              ],
            ].map((group, i) => (
              <div
                key={i}
                className="services-blocks"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {group.map((item, j) => (
                  <div key={j} className="info-block">
                    <img src={item.img} alt="" className="service-icon" />
                    <h3 style={{color:"#666666"}}>{item.text}</h3>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="section-footer">
            Not just CFO Services, it's a{" "}
            <span style={{ color: "#34D399", fontWeight: 700 }}>
              Sustainable System
            </span>{" "}
            to transform & optimize your finances and fuel growth.
          </p>
        </section>
      </div>
    </section>
  );
}
