import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import RouteFolder from "../assets/RouteFolder.svg";

const AppBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link color="textPrimary" href="/">
      <img src={RouteFolder} alt={''} height={20} width={40}  className='bg-cayn'/>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <Link key={routeTo} color="textPrimary" href={routeTo}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
