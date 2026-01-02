import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
    <div className="bg-gradient-to-br from-black via-gray-900 to-black 
             backdrop-blur-xl p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white">
        <div className="footer-section">
            <h4>Modules</h4>
            <ul>
                <li><a href="#">AI CFO Dashboard</a></li>
                <li><a href="#">AI AR/AP Module</a></li>
                <li><a href="#">AI Treasury</a></li>
                <li><a href="#">AI Sales-to-Cash Reconciliation</a></li>
                <li><a href="#">AI TDS Reconciliation</a></li>
            </ul>
        </div>
        <div className="footer-section">
            <h4>Resources</h4>
            <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Research Papers</a></li>
                <li><a href="#">Blog & Webinars</a></li>
                <li><a href="#">Templates</a></li>
                <li><a href="#">API Reference</a></li>
            </ul>
        </div>
        <div className="footer-section">
            <h4>Security</h4>
            <ul>
                <li><a href="#">SOC 2 Report</a></li>
                <li><a href="#">GDPR Compliance</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Security Roadmap</a></li>
                <li><a href="#">Contact Security</a></li>
                <li><a href="#">Terms of Service</a></li>
            </ul>
        </div>
        <div className="footer-section">
            <h4>Company</h4>
            <ul>
                <li>
          {/* Use Link instead of <a> */}
          <Link to="/about">About Us</Link>
        </li>

                <li><a href="https://scaleupcfo.in/">Leadership Team</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">News & Press</a></li>
                <li><a href="#">Contact Sales</a></li>
                <li><a href="#">Status Page</a></li>
            </ul>
        </div>
    </div>
</footer>

  );
}