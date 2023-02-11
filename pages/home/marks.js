import Page from "../../components/Page";
import React from "react";
import StudentMarksPage from "../../components/Marks/StudentMarksPage";
import TeacherMarksPage from "../../components/Marks/TeacherMarksPage";
import { useSession } from "next-auth/react";

export default function marks() {
  const { data: session } = useSession();
  const urole = session?.user?.role;

  const page = React.useMemo(() => {
    return urole === "professor" ? (
      <TeacherMarksPage user={session?.user} />
    ) : (
      <StudentMarksPage user={session?.user} />
    );
  }, [urole]);

  return <Page title="Оцінки">{page}</Page>;
}
