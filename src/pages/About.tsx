
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Trendy Design</h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          We're on a mission to redefine fashion with premium quality, sustainable materials, and timeless designs.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Trendy Design was founded in December 2024 with a clear vision: to blend style, comfort, and sustainability through high-quality, custom-printed products. What started as a passion project has grown into a trusted brand known for customized t-shirt printing in Chennai and a strong commitment to ethical practices.
          </p>
          <p className="text-muted-foreground mb-4">
            Inspired by global fashion trends and the idea of making personalized merchandise accessible to all, we set out to create a brand that empowers customers to express their identity through design. Today, Trendy Design offers a wide range of products including custom t-shirts, printed cups, customized water bottles, keychains, and mouse pads—all tailored to your exact specifications.
          </p>
          <p className="text-muted-foreground mb-4">
            Whether you need corporate t-shirt printing in Chennai, branded merchandise for events, or unique personalized gifts, we make it simple to order your favorite items with your desired design—at affordable prices without compromising quality.
          </p>
           <p className="text-muted-foreground mb-4">
            We proudly serve not just Chennai but customers across India and internationally. Our streamlined process and global delivery network ensure that your custom printing needs are fulfilled no matter where you are, with the same attention to detail and care.
          </p>
          <p className="text-muted-foreground">
            At Trendy Design, we believe fashion and function can work hand in hand. We're on a mission to make custom printing in Chennai and beyond an effortless, creative, and meaningful experience.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
            alt="Our inspiration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16 bg-muted/20 rounded-lg px-6 md:px-12 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-muted-foreground">
              We never compromise on quality. From fabric selection to the final stitch, every step is carefully monitored to ensure excellence.
            </p>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8.44 12.5a.5.5 0 1 1-.88-.5 5 5 0 0 1 6.88-1.83.5.5 0 1 1-.5.87 4 4 0 0 0-5.5 1.46Z"></path><path d="M8.44 5.5a.5.5 0 1 1-.88-.5 9 9 0 0 1 12.38-3.3.5.5 0 1 1-.5.87 8 8 0 0 0-11 2.93Z"></path><path d="M14.75 14a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"></path><path d="M13.5 3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-2Z"></path><path d="M7.88 15.38a3 3 0 1 0-2.49-2.3.5.5 0 1 1-.99.12 4 4 0 1 1 3.31 3.13.5.5 0 1 1 .17-.95Z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to sustainable practices. From eco-friendly materials to ethical manufacturing, we minimize our environmental footprint.
            </p>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="18" cy="16" r="3"></circle><circle cx="6" cy="16" r="3"></circle><circle cx="12" cy="10" r="3"></circle><path d="M15 16H9"></path><path d="m9 10 3-6 3 6"></path><path d="m15 10 6 3-3 3"></path><path d="M3 13 9 10"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              We believe in building relationships. Our customers aren't just buyers; they're part of our community, helping us grow and evolve.
            </p>
          </div>
        </div>
      </div>

      {/*
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "Samantha Williams",
              role: "Head of Design",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "Michael Chen",
              role: "Production Manager",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            {
              name: "Emily Rodriguez",
              role: "Sustainability Officer",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="rounded-full overflow-hidden mx-auto mb-4 w-48 h-48">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="text-center bg-black text-white py-16 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Experience the perfect blend of style, comfort, and sustainability with Trendy Design. Explore our collection and be a part of our story.
        </p>
        <Button size="lg" asChild>
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
