// services/course-service.js

class CourseService {
    // Méthode pour ajouter un cours au localStorage
    static add(course) {
      if (!course.id || !course.name || !course.code || !course.credits) {
        throw new Error('Incomplete course information');
      }
  
      const courses = this._getAllCourses();
      courses[course.id] = course;
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  
    // Méthode pour récupérer tous les cours depuis le localStorage
    static getAll() {
      return Object.values(this._getAllCourses());
    }
  
    // Méthode pour récupérer un cours depuis le localStorage
    static get(identifier) {
      const courses = this._getAllCourses();
      return courses[identifier] || null;
    }
  
    // Méthode pour mettre à jour un cours dans le localStorage
    static update(course) {
      if (!course.id || !course.name || !course.code || !course.credits) {
        throw new Error('Incomplete course information');
      }
  
      const courses = this._getAllCourses();
      if (!courses[course.id]) {
        throw new Error('Course not found');
      }
  
      courses[course.id] = course;
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  
    // Méthode pour supprimer un cours du localStorage
    static delete(identifier) {
      const courses = this._getAllCourses();
      
      if (courses[identifier]) {
        delete courses[identifier];
        localStorage.setItem('courses', JSON.stringify(courses));
        return;
      }
  
      throw new Error('Course not found');
    }
  
    // Méthode privée pour récupérer tous les cours depuis le localStorage
    static _getAllCourses() {
      const courses = localStorage.getItem('courses');
      return courses ? JSON.parse(courses) : {};
    }
  }
  
  module.exports = CourseService;
  