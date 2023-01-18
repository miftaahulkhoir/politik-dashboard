import { useRouter } from 'next/router';
import ProfileDropdown from '../dashboardLayout/ProfileDropdown';
import HomeMoreMenuDropdown from './HomeMoreMenuDropdown';
import styles from './homeNavbar.module.css';

export default function HomeNavbar() {
  const router = useRouter();

  const links = [
    { name: 'Manajemen Survei', path: '/surveys' },
    { name: 'Analisis Survei', path: '/survey-analysis' },
    { name: 'Analisis Sentimen', path: '/sentiment-analysis' },
    { name: 'WhatsApp Blast', path: '/whatsapp-blast' },
  ];

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <img src="/images/logo/icon-logo.png" alt="Patrons" />
          <img src="/images/logo/logo.png" alt="Patrons" />
        </div>
        <div className={styles.items_container}>
          <div className={styles.links_container}>
            {links.map((link, i) => (
              <div role="button" key={i} onClick={() => router.push(link.path)}>
                {link.name}
              </div>
            ))}
          </div>
          <HomeMoreMenuDropdown />
          <ProfileDropdown />
        </div>
      </nav>
    </header>
  );
}
