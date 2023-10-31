import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-4 text-center text-muted">
      © {new Date().getFullYear()} Waiter.app. All rights reserved.
    </footer>
  );
};

export default Footer;