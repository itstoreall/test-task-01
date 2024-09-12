import Input from '../Input';
import Dropdown from '../Dropdown';
import s from './Pages.module.scss';

const config = {
  title: 'Edit User',
  subtitle: 'User Information'
};

const { title, subtitle } = config;

const EditUser = () => {
  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.edit}`}>
        <h2>{title}</h2>

        <div className={s.ownerBlock}>
          <Dropdown />
        </div>

        <div className={s.companyInfoBlock}>
          <h3>{subtitle}</h3>
          <div className={s.frame}>
            <Input />
            <Dropdown />
          </div>
          <div className={s.frame}>
            <Dropdown />
            <Dropdown />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditUser;
