import CalBookingButton from "./DemoBookingButton";

export default function CTA() {
  return (
    <section 
      className="cta-final" 
      style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
        padding: '3rem 1rem', // Ultra tight mobile padding
        textAlign: 'center'
      }}
    >
      <div 
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 0.5rem', // Extra tight sides
          overflow: 'hidden' // Force no overflow
        }}
      >
        <h2 
          style={{
            fontSize: '1.75rem', // Mobile-first small
            fontWeight: 900,
            margin: '0 0 1rem 0',
            lineHeight: 1.2,
            color: '#ffffff'
          }}
          className="md:text-4xl lg:text-5xl"
        >
          Stop Firefighting Finance. Start Running It.
        </h2>
        
        <p 
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.5,
            margin: '0 0 1.5rem 0',
            color: '#cccccc',
            maxWidth: '100%'
          }}
          className="md:text-lg max-w-sm mx-auto"
        >
          14 days free. All modules. No credit card. Your data or sample data—your choice.
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <CalBookingButton
            title="Schedule Demo →"
            module_name="CTA Final Section"
            className="block w-full max-w-[280px] mx-auto px-6 py-3 bg-[#34D399] text-black font-bold text-base rounded-xl hover:brightness-125 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          />
        </div>

        <p 
          style={{
            fontSize: '0.8rem',
            color: '#999999',
            margin: 0,
            maxWidth: '100%'
          }}
          className="md:text-sm md:max-w-xs"
        >
          Questions? Schedule a 20-minute demo with our CFO advisory team.
        </p>
      </div>
    </section>
  );
}
