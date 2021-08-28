from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils.timezone import now

from save_it.models.task import Task


class TaskModelTest(TestCase):

    def create_task(self, deadline=now(), creation_date=now(), title='Task Title', description='Task Description',
                    completed=False,
                    user='testuser@gmail.com'):
        return Task.objects.create(title=title, description=description, completed=completed, user=user,
                                   deadline=deadline, creation_date=creation_date)

    def test_task_creation_without_tags(self):
        time_now = now()
        task = self.create_task(deadline=time_now, creation_date=time_now)
        self.assertTrue(isinstance(task, Task))
        self.assertEqual(task.get_title(), 'Task Title')
        self.assertEqual(task.get_description(), 'Task Description')
        self.assertEqual(task.get_creation_date(), time_now)
        self.assertEqual(task.get_deadline(), time_now)
        self.assertEqual(task.get_completed_status(), False)
        self.assertEqual(task.get_user(), 'testuser@gmail.com')

    def test_task_cannot_be_created_with_title_longer_than_120_chars(self):
        title = 'w7jcZTo8q3Fq4UFDm4YIyrZYnJCFLjucp0BcQmkBlpcL4dHzABt3Apy3Dsk1Lj5E7VjxqsfM71jkp7M4HgrEBB' \
                '6PFeS9qzFIbqnrtJxIxewat9Jyq2w7iC2Jg'
        self.assertRaises(ValidationError, self.create_task(title=title))

