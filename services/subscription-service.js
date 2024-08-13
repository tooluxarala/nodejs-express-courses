// services/subscription-service.js

class SubscriptionService {
    static add(subscription) {
      if (!subscription.id || !subscription.student || !subscription.course || !subscription.date) {
        throw new Error('Incomplete subscription information');
      }
  
     
      const studentService = require('./student-service');
      const courseService = require('./course-service');
      const student = studentService.get(subscription.student.number);
      const course = courseService.get(subscription.course.code);
  
      if (!student) {
        throw new Error('Student not found');
      }
  
      if (!course) {
        throw new Error('Course not found');
      }
  
      const subscriptions = this._getAllSubscriptions();
      subscriptions[subscription.id] = subscription;
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  
    // Méthode pour récupérer les inscriptions par étudiant depuis le localStorage
    static getByStudent(student) {
      const subscriptions = this._getAllSubscriptions();
      return Object.values(subscriptions).filter(sub => sub.student.number === student.number);
    }
  
    // Méthode pour récupérer les inscriptions par cours depuis le localStorage
    static getByCourse(course) {
      const subscriptions = this._getAllSubscriptions();
      return Object.values(subscriptions).filter(sub => sub.course.code === course.code);
    }
  
    // Méthode pour mettre à jour une inscription dans le localStorage
    static update(subscription) {
      if (!subscription.id || !subscription.student || !subscription.course || !subscription.date) {
        throw new Error('Incomplete subscription information');
      }
  
      const subscriptions = this._getAllSubscriptions();
      if (!subscriptions[subscription.id]) {
        throw new Error('Subscription not found');
      }
  
      // Vérifier la validité de l'étudiant et du cours
      const studentService = require('./student-service');
      const courseService = require('./course-service');
      const student = studentService.get(subscription.student.number);
      const course = courseService.get(subscription.course.code);
  
      if (!student) {
        throw new Error('Student not found');
      }
  
      if (!course) {
        throw new Error('Course not found');
      }
  
      subscriptions[subscription.id] = subscription;
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  
    // Méthode pour supprimer une inscription du localStorage
    static delete(identifier) {
      const subscriptions = this._getAllSubscriptions();
  
      if (subscriptions[identifier]) {
        delete subscriptions[identifier];
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        return;
      }
  
      // Vérifier par code de cours
      const allSubscriptions = Object.values(subscriptions);
      const subscriptionToDelete = allSubscriptions.find(sub => sub.course.code === identifier);
      
      if (subscriptionToDelete) {
        delete subscriptions[subscriptionToDelete.id];
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        return;
      }
  
      throw new Error('Subscription not found');
    }
  
   
    static _getAllSubscriptions() {
      const subscriptions = localStorage.getItem('subscriptions');
      return subscriptions ? JSON.parse(subscriptions) : {};
    }
  }
  
  module.exports = SubscriptionService;
  