import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Foodie</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Get Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">For Restaurants</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Partner with us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Apps for restaurants
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              © 2023 Foodie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
