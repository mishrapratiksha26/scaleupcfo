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

export default function Services() {
  return (
    <section id="services" style={{paddingTop:0, paddingBottom:0}}>
      <div className="container">
        {/* Block 1 – Pain points */}
        <section className="why-choose-us-section" style={{paddingBottom:0, paddingTop:0}}>
          <h1>Financial Complexities slowing you down?</h1>

          <div className="why-choose-us-grid">
            <section className="dual-thoughts-section" style={{paddingBottom:0, paddingTop:0}}>
              <div className="person-container">
                <img
                  src={confusedMan}
                  alt="Doodle Man Thinking"
                  className="person-image"
                />
              </div>
            </section>

            <section className="why-choose-us" style={{paddingBottom:0, paddingTop:0}}>
              <ul className="thought-list">
                <li className="thought-item">
                  <img src={cmIcon} alt="FM Icon" />
                  <p>Growing Financial Complexities</p>
                </li>
                <li className="thought-item">
                  <img src={tsmIcon} alt="FM Icon" />
                  <p>Investors asking more than just numbers</p>
                </li>
                <li className="thought-item">
                  <img src={bbfIcon} alt="FM Icon" />
                  <p>Cash burn visibility not clear</p>
                </li>
                <li className="thought-item">
                  <img src={abIcon} alt="FM Icon" />
                  <p>Worried about fund raise &amp; valuation</p>
                </li>
              </ul>
            </section>
          </div>
        </section>

        {/* Block 2 – Why you need us */}
        <section className="why-need-us-section">
          <div className="why-need-us-grid">
            <h3>
              Your Startup <br />
              Needs More Than <br />
              Just a Numbers Person...
            </h3>

            <section className="why-choose-finbook" style={{paddingBottom:0, paddingTop:0}}>
              <h3>Strategic CFO Partner who can</h3>
              <ul className="reasons-list">
                <li className="reason-item">
                  <img src={bbfIcon} alt="FM Icon" />
                  <p>
                    Lead fund raise and
                    <br />
                    investor outreach
                  </p>
                </li>
                <li className="reason-item">
                  <img src={abIcon} alt="FM Icon" />
                  <p>
                    Build narratives
                    <br />
                    from numbers
                  </p>
                </li>
                <li className="reason-item">
                  <img src={cmIcon} alt="FM Icon" />
                  <p>
                    Optimize cash burn
                    <br />
                    for growth
                  </p>
                </li>
                <li className="reason-item">
                  <img src={tsmIcon} alt="FM Icon" />
                  <p>
                    Understand investor
                    <br />
                    expectations
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </section>

        {/* Block 3 – Process */}
        <div className="process-container">
          <h2>Our Process, Your Insights!</h2>

          <div className="process-grid">
            <div className="process-step">
              <img className="process-step-img1" src={step1Img} alt="step-1" />
              <div className="process-step-content process-step-1">
                <h3>Consultation &amp; Discovery</h3>
                <p>
                  Detailed discovery workshop to
                  <br />
                  understand your growth objective
                  <br />
                  and financial needs.
                </p>
              </div>
            </div>

            <div className="process-step">
              <img className="process-step-img2" src={step2Img} alt="step-2" />
              <div className="process-step-content process-step-2">
                <h3>Financial Visibility Assessment</h3>
                <p>
                  We identify current inefficiencies,
                  <br />
                  cash flow gaps and evaluate
                  <br />
                  current KPI tracking for visibility.
                </p>
              </div>
            </div>

            <div className="process-step">
              <img className="process-step-img3" src={step3Img} alt="step-3" />
              <div className="process-step-content process-step-3">
                <h3>Real-time Insights &amp; Weekly Sync-up</h3>
                <p>
                  Custom KPI dashboards for tracking,
                  <br />
                  investor-ready financial reports, monthly
                  <br />
                  presentations and pitch materials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Block 4 – CFO offerings */}
        <section className="virtual-cfo-section">
          <h2 className="section-title">Our CFO Offerings...</h2>

          <div className="services-blocks-main">
            <div className="services-blocks">
              <div className="info-block">
                <div className="icon">
                  <img src={dartIcon} alt="Finance Advisory Icon" width={30} height={30} />
                </div>
                <h3>Financial Advisory in Decision Making</h3>
              </div>

              <div className="vertical-line" />

              <div className="info-block">
                <div className="icon">
                  <img src={irIcon} alt="IR Icon" width={30} height={30} />
                </div>
                <h3>Investor Reporting and Investor Relations</h3>
              </div>

              <div className="vertical-line" />

              <div className="info-block">
                <div className="icon">
                  <img src={cmIcon} alt="CM Icon" width={40} height={30} />
                </div>
                <h3>Cashflow Management and Forecasting</h3>
              </div>

              <div className="vertical-line" />

              <div className="info-block">
                <div className="icon">
                  <img src={abIcon} alt="AB Icon" width={40} height={30} />
                </div>
                <h3>Accounting and Bookkeeping</h3>
              </div>
            </div>

            <div className="services-blocks">
              <div className="info-block">
                <div className="icon">
                  <img src={pfIcon} alt="PF Icon" width={30} height={30} />
                </div>
                <h3>Pitch Deck &amp; Fundraising</h3>
              </div>

              <div className="vertical-line" />

              <div className="info-block">
                <div className="icon">
                  <img src={tsmIcon} alt="TSM Icon" width={30} height={30} />
                </div>
                <h3>Term Sheet and SHA Management</h3>
              </div>

              <div className="vertical-line" />

              <div className="info-block">
                <div className="icon">
                  <img src={fmIcon} alt="FM Icon" width={40} height={30} />
                </div>
                <h3>Financial Modelling</h3>
              </div>

              <div className="vertical-line" />

              <div className="info-block">
                <div className="icon">
                  <img src={bbfIcon} alt="BBF Icon" width={40} height={30} />
                </div>
                <h3>Business Budgeting and Forecasting</h3>
              </div>
            </div>
          </div>

          <p className="section-footer">
            Not just CFO Services, it's a{" "}
            <span className="highlight">Sustainable System</span> to transform &amp;
            optimize your finances and fuel your company's growth.
          </p>
        </section>
      </div>
    </section>
  );
}
