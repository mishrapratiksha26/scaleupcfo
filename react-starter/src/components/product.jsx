export default function Product(){
    return (
        <section className="products" id="products">
    <div className="container">
        <div className="section-header">
            <h2>AI-Powered CFO Modules</h2>
            <p>Enterprise-grade automation with human expertise. Each module works standalone or together for complete finance transformation.</p>
        </div>
        <div className="products-grid">
            {/* <!-- Product 1: Dashboard --> */}
            <div className="product-card">
                <div className="product-icon">📊</div>
                <h3>AI Dashboard</h3>
                <p>Real-time financial visibility powered by multi-agent AI. Predictive analytics, KPI tracking, and drill-down insights in one unified view.</p>
                <ul className="product-features">
                    <li>Real-time cash position across all accounts</li>
                    <li>Predictive analytics with AI reasoning</li>
                    <li>Custom KPI dashboards</li>
                    <li>Executive summary generation</li>
                    <li>Mobile app included</li>
                </ul>
                <a href="#" className="learn-more">Explore Dashboard →</a>
            </div>

            {/* <!-- Product 2: AR/AP Optimization --> */}
            <div className="product-card">
                <div className="product-icon">💰</div>
                <h3>AR/AP Optimization</h3>
                <p>90%+ touchless processing. Smart GL coding learns from your transaction history. Auto-capture early payment discounts. Zero manual intervention.</p>
                <ul className="product-features">
                    <li>90%+ invoice touchless processing</li>
                    <li>Smart GL coding (learns from history)</li>
                    <li>Auto-discount capture</li>
                    <li>Multi-entity consolidation</li>
                    <li>Exception management</li>
                </ul>
                <a href="#" className="learn-more">Explore AR/AP →</a>
            </div>

            {/* <!-- Product 3: Treasury Management --> */}
            <div className="product-card">
                <div className="product-icon">🏦</div>
                <h3>Treasury Management</h3>
                <p>Real-time cash visibility across multi-currency accounts. Predictive forecasting. What-if analysis. Multi-bank, multi-account orchestration.</p>
                <ul className="product-features">
                    <li>Real-time cash positioning</li>
                    <li>Predictive cash forecasting</li>
                    <li>Multi-currency conversion</li>
                    <li>Liquidity optimization</li>
                    <li>Banking integration (100+ banks)</li>
                </ul>
                <a href="#" className="learn-more">Explore Treasury →</a>
            </div>

            {/* <!-- Product 4: Sales-to-Cash --> */}
            <div className="product-card">
                <div className="product-icon">↔️</div>
                <h3>Sales-to-Cash</h3>
                <p>Order-to-payment full automation. 80% faster unapplied cash discovery. Reduce DSO by 40-60%. Intelligent customer matching with AI reasoning.</p>
                <ul className="product-features">
                    <li>Order-to-payment automation</li>
                    <li>80% faster unapplied cash discovery</li>
                    <li>40-60% DSO reduction</li>
                    <li>Auto-customer matching</li>
                    <li>AR aging & follow-up</li>
                </ul>
                <a href="#" className="learn-more">Explore S2C →</a>
            </div>

            {/* <!-- Product 5: TDS Reconciliation --> */}
            <div className="product-card">
                <div className="product-icon">📋</div>
                <h3>TDS Reconciliation</h3>
                <p><strong>India-specific.</strong> 26AS matching with auto-corrections. GST compliance. TDS deadline tracking. Penalty avoidance guaranteed.</p>
                <ul className="product-features">
                    <li>26AS auto-matching with corrections</li>
                    <li>GST harmonization</li>
                    <li>TDS deadline tracking</li>
                    <li>Deductor communication</li>
                    <li>Penalty avoidance guarantee</li>
                </ul>
                <a href="#" className="learn-more">Explore TDS →</a>
            </div>

            {/* <!-- Bonus: Financial Forecasting --> */}
            <div className="product-card">
                <div className="product-icon">🔮</div>
                <h3>Financial Forecasting</h3>
                <p>Scenario planning. Working capital optimization. Budget variance detection. Anomaly alerts before issues escalate.</p>
                <ul className="product-features">
                    <li>3-scenario forecasting</li>
                    <li>Working capital optimization</li>
                    <li>Budget variance analysis</li>
                    <li>Spend categorization (AI)</li>
                    <li>Cost reduction insights</li>
                </ul>
                <a href="#" className="learn-more">Explore Forecasting →</a>
            </div>
        </div>
    </div>
</section>
    );
}