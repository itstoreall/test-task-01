import Input from '../Input';
import Dropdown from '../Dropdown';
import s from './Pages.module.scss';

const config = {
  title: 'Edit User',
  subtitle: 'User Information',
  inputHeader: 'Full Name'
};

const { title, subtitle, inputHeader } = config;

const EditUser = () => {
  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.editUser}`}>
        <h2>{title}</h2>

        <div className={s.ownerBlock}>
          <Dropdown />
        </div>

        <div className={s.companyInfoBlock}>
          <h3 className={s.subtitle}>{subtitle}</h3>

          <div className={s.frame}>
            <Input header={inputHeader} />
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
