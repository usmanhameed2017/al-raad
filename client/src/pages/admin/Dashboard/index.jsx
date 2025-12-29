import styles from "./style.module.css";
import { FaUsers, FaUserCheck, FaChartLine, FaFolderOpen, FaTheaterMasks, FaCalendarCheck, FaMoneyCheckAlt,
FaMoneyCheck, FaClock, FaPlayCircle, FaBookOpen, FaEnvelope, 
FaBookReader} from "react-icons/fa";
import { PiUsers } from "react-icons/pi";
import Animation from "../../../components/Animation";

function Dashboard() 
{
    return (
        <Animation type="page">
            <div className={styles.dashboardContainer}>
                {/* First Row */}
                <div className={styles.row}>
                    {/* Total users */}
                    <div className={styles.widget}>
                        <FaUsers className={styles.icon} />
                        <div>
                            <h3> { 3 } </h3>
                            <p>Total Users</p>
                        </div>
                    </div>                   

                    {/* Lectures uploaded */}
                    <div className={styles.widget}>
                        <FaPlayCircle className={styles.icon} />
                        <div>
                            <h3> { 4 } </h3>
                            <p>Lectures Uploaded</p>
                        </div>
                    </div>

                    {/* Total Books & Articlles */}
                    <div className={styles.widget}>
                        <FaBookReader  className={styles.icon} />
                        <div>
                            <h3> { 2 } </h3>
                            <p>Total Books & Articles</p>
                        </div>
                    </div>                     

                    {/* Total Tafseer */}
                    <div className={styles.widget}>
                        <FaBookOpen className={styles.icon} />
                        <div>
                            <h3> { 2 } </h3>
                            <p>Total Tafseers</p>
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className={styles.row}>
                    {/* Anayltics */}
                    <div className={styles.largeWidget}>
                        <FaChartLine className={styles.iconLarge} />
                        <h3>Analytics Overview</h3>
                        <p>Detailed insights about users, tafseer, and books.</p>
                    </div>

                    {/* Engagements */}
                    <div className={styles.column}>
                        {/* New Signups */}
                        <div className={styles.widget}>
                            <PiUsers className={styles.icon} />
                            <div>
                                <h3> { 3 } </h3>
                                <p> New signups </p>
                            </div>
                        </div>

                        {/* New Mails */}
                        <div className={styles.widget}>
                            <FaEnvelope className={styles.icon} />
                            <div>
                                <h3> { 2 } </h3>
                                <p> New Mails </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Animation>
    );
}

export default Dashboard;