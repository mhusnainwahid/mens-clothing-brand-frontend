const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-6">
            About Loveable
          </h1>
          <p className="text-xl text-brand-warm-gray max-w-3xl mx-auto">
            Crafting premium men's fashion that combines timeless elegance with modern sophistication since 2020.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Our Story</h2>
            <p className="text-brand-warm-gray leading-relaxed mb-4">
              Loveable was born from a simple belief: every man deserves clothing that makes him feel confident, 
              comfortable, and authentically himself. We started with a mission to create premium menswear that 
              bridges the gap between timeless style and contemporary fashion.
            </p>
            <p className="text-brand-warm-gray leading-relaxed">
              Our founders, passionate about both fashion and quality craftsmanship, spent years working with 
              master tailors and textile artisans to develop our unique approach to men's fashion. Today, 
              we continue to uphold those same standards of excellence in every piece we create.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Quality First</h3>
                <p className="text-brand-warm-gray">
                  We source only the finest materials and work with skilled artisans to ensure every piece meets our high standards.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Timeless Design</h3>
                <p className="text-brand-warm-gray">
                  Our designs focus on classic silhouettes with modern touches that transcend seasonal trends.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-2">Sustainable Practice</h3>
                <p className="text-brand-warm-gray">
                  We're committed to responsible manufacturing and sustainable business practices for a better future.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">Why Choose Loveable?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <p className="text-brand-warm-gray">
                  <strong className="text-brand-charcoal">Premium Materials:</strong> We use only the finest fabrics and materials sourced from trusted suppliers worldwide.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <p className="text-brand-warm-gray">
                  <strong className="text-brand-charcoal">Expert Craftsmanship:</strong> Every piece is carefully constructed by skilled artisans with decades of experience.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <p className="text-brand-warm-gray">
                  <strong className="text-brand-charcoal">Perfect Fit:</strong> Our sizing is carefully calibrated to ensure the best possible fit for modern men.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-accent rounded-full mt-2"></div>
                <p className="text-brand-warm-gray">
                  <strong className="text-brand-charcoal">Customer Service:</strong> Our dedicated team is here to help you find the perfect pieces for your wardrobe.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-brand-light-gray rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
              Join the Loveable Community
            </h2>
            <p className="text-brand-warm-gray mb-6 max-w-2xl mx-auto">
              When you choose Loveable, you're not just buying clothes – you're joining a community of men who 
              appreciate quality, style, and the confidence that comes from wearing something truly special.
            </p>
            <div className="text-brand-warm-gray">
              <p>Customer Service: contact@loveable.com</p>
              <p>Phone: 1-800-LOVEABLE</p>
              <p>Hours: Monday - Friday, 9AM - 6PM EST</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;